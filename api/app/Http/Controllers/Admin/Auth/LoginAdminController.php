<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Enum\Property\UserProperty;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\LoginAdminFormRequest;
use App\Models\User;
use App\Support\Arr;
use App\ValueObjects\AdminUserValueObject;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginAdminController extends Controller
{
    use AuthenticatesUsers;

    public const username_or_email = 'username_or_email';

    private string $inputType = UserProperty::username;

    /**
     * Handle the incoming request.
     *
     * @param LoginAdminFormRequest $request
     * @return JsonResponse|void
     * @throws ValidationException
     */
    public function __invoke(LoginAdminFormRequest $request)
    {
        $usernameOrEmail = $request->get(Str::camel(self::username_or_email));

        $this->inputType = filter_var($usernameOrEmail, FILTER_VALIDATE_EMAIL)
            ? UserProperty::email
            : UserProperty::username;
        $request->merge([
            $this->username() => $usernameOrEmail
        ]);

        return $this->login($request);
    }

    /**
     * Attempt to log the user into the application.
     *
     * @param Request $request
     * @return bool
     */
    protected function attemptLogin(Request $request)
    {
        $token = $this->guard()->attempt($this->credentials($request));

        if (!$token) {
            return false;
        }

        /** @var User $user */
        $user = $this->guard()->user();
        // メールアドレスが認証されているか
        if (!$user->hasVerifiedEmail()) {
            return false;
        }
        // 管理者かどうか
        if (!$user->isAdminUser()) {
            return false;
        }

        return true;
    }

    /**
     * Send the response after the user was authenticated.
     *
     * @param Request $request
     * @return JsonResponse
     */
    protected function sendLoginResponse(Request $request)
    {
        $this->clearLoginAttempts($request);

        /** @var User $user */
        $user = $this->guard()->user();

        return response()->json(Arr::camel_keys(
            AdminUserValueObject::byEloquent($user, $user->adminUser)->toArray(true)
        ));
    }

    /**
     * Get the failed login response instance.
     *
     * @param Request $request
     * @return JsonResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function sendFailedLoginResponse(Request $request)
    {
        $user = $this->guard()->user();

        if ($user && !$user->hasVerifiedEmail()) {
            throw VerifyEmailException::forUser($user);
        }

        throw ValidationException::withMessages([
            'data' => 'ログインに失敗しました。メールアドレス、パスワードを再度、確認してください。',
        ]);
    }

    protected function username()
    {
        return $this->inputType;
    }
}
