<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Auth;

use App\Enum\Property\UserProperty;
use App\Exceptions\VerifyEmailException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\LoginAdminFormRequest;
use App\Models\User;
use App\Support\Arr;
use App\ValueObjects\AdminUserValueObject;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

final class LoginAdminController extends Controller
{
    use AuthenticatesUsers;

    const USERNAME_OR_EMAIL = 'username_or_email';

    private string $inputType = UserProperty::username;

    /**
     * Handle the incoming request.
     *
     * @param LoginAdminFormRequest $request
     *
     * @throws ValidationException
     *
     * @return JsonResponse|void
     */
    public function __invoke(LoginAdminFormRequest $request)
    {
        Log::debug('LoginAdminController args none');

        $usernameOrEmail = $request->get(Str::camel(self::USERNAME_OR_EMAIL));

        $this->inputType = filter_var($usernameOrEmail, FILTER_VALIDATE_EMAIL)
            ? UserProperty::email
            : UserProperty::username;
        $request->merge([
            $this->username() => $usernameOrEmail,
        ]);

        return $this->login($request);
    }

    /**
     * Attempt to log the user into the application.
     *
     * @param Request $request
     *
     * @return bool
     */
    protected function attemptLogin(Request $request)
    {
        Log::debug('LoginAdminController attemptLogin');

        $token = $this->guard()->attempt($this->credentials($request));
        Log::debug("LoginAdminController attemptLogin token=$token");

        if (!$token) {
            return false;
        }

        /** @var User $user */
        $user = $this->guard()->user();

        $hasVerifiedEmail = $user->hasVerifiedEmail();
        // メールアドレスが認証されているか
        Log::debug("LoginAdminController attemptLogin hasVerifiedEmail=$hasVerifiedEmail");
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
     *
     * @return JsonResponse
     */
    protected function sendLoginResponse(Request $request)
    {
        Log::debug('LoginAdminController sendLoginResponse');

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
     *
     * @throws ValidationException
     *
     * @return JsonResponse
     */
    protected function sendFailedLoginResponse(Request $request)
    {
        Log::debug('LoginAdminController sendFailedLoginResponse');

        /** @var User $user */
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
