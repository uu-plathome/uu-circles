<?php

namespace App\Http\Controllers\Circle\Auth;

use App\Enum\Property\UserProperty;
use App\Exceptions\VerifyEmailException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Circle\Auth\LoginCircleFormRequest;
use App\Models\User;
use App\Support\Arr;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginCircleController extends Controller
{
    use AuthenticatesUsers;

    public const username_or_email = 'username_or_email';

    private string $inputType = UserProperty::username;

    /**
     * Handle the incoming request.
     *
     * @param LoginCircleFormRequest $request
     * @return JsonResponse|void
     * @throws ValidationException
     */
    public function __invoke(LoginCircleFormRequest $request)
    {
        Log::debug("LoginCircleController args none");

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
        Log::debug("LoginCircleController#attemptLogin");

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
        // サークル管理者かどうか
        if (!$user->isCircleUser()) {
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
        Log::debug("LoginCircleController#sendLoginResponse");

        $this->clearLoginAttempts($request);

        /** @var User $user */
        $user = $this->guard()->user();

        return response()->json(Arr::camel_keys($user->toArray()));
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
        Log::debug("LoginCircleController#sendFailedLoginResponse");

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
