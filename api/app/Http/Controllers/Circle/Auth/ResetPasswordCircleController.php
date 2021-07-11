<?php

declare(strict_types=1);

namespace App\Http\Controllers\Circle\Auth;

use App\Events\PasswordResetCircleUser;
use App\Http\Controllers\Controller;
use App\Http\Requests\Circle\Auth\ResetPasswordCircleRequest;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

final class ResetPasswordCircleController extends Controller
{
    use ResetsPasswords;

    public function __invoke(ResetPasswordCircleRequest $request)
    {
        Log::debug('ResetPasswordCircleController args none');

        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.
        $response = $this->broker()->reset(
            $this->credentials($request),
            function ($user, $password) {
                $this->resetPassword($user, $password);
            }
        );

        // If the password was successfully reset, we will redirect the user back to
        // the application's home authenticated view. If there is an error we can
        // redirect them back to where they came from with their error message.
        return $response == Password::PASSWORD_RESET
            ? $this->sendResetResponse($request, $response)
            : $this->sendResetFailedResponse($request, $response);
    }

    /**
     * Reset the given user's password.
     *
     * @param \Illuminate\Contracts\Auth\CanResetPassword $user
     * @param string                                      $password
     *
     * @return void
     */
    protected function resetPassword($user, $password)
    {
        Log::debug('ResetPasswordCircleController#resetPassword');

        $this->setUserPassword($user, $password);

        $user->setRememberToken(Str::random(60));

        $user->save();

        event(new PasswordResetCircleUser($user));

        $this->guard()->login($user);
    }

    /**
     * Get the response for a successful password reset.
     *
     * @param Request $request
     * @param string  $response
     *
     * @return array
     */
    protected function sendResetResponse(Request $request, $response)
    {
        Log::debug('ResetPasswordCircleController#sendResetResponse');

        return ['status' => trans($response)];
    }

    /**
     * Get the response for a failed password reset.
     *
     * @param Request $request
     * @param string  $response
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendResetFailedResponse(Request $request, $response)
    {
        Log::debug('ResetPasswordCircleController#sendResetFailedResponse');

        return response()->json(['email' => trans($response)], 400);
    }
}
