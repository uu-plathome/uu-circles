<?php

namespace App\Http\Controllers\Circle\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Circle\Auth\ForgotPasswordCircleRequest;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;

class ForgotPasswordCircleController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */
    use SendsPasswordResetEmails;

    public function __invoke(ForgotPasswordCircleRequest $request)
    {
        Log::debug("ForgotPasswordCircleController args none");

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $response = $this->broker()->sendResetLink(
            $this->credentials($request),
            function ($user, $token) {
                $user->sendCircleUserPasswordResetNotification($token);
            }
        );

        return $response == Password::RESET_LINK_SENT
            ? $this->sendResetLinkResponse($request, $response)
            : $this->sendResetLinkFailedResponse($request, $response);
    }


    /**
     * Get the response for a successful password reset link.
     *
     * @param Request $request
     * @param string $response
     * @return RedirectResponse|int[]
     */
    protected function sendResetLinkResponse(Request $request, $response)
    {
        Log::debug("ForgotPasswordCircleController#sendResetLinkResponse");

        return ['status' => trans($response)];
    }

    /**
     * Get the response for a failed password reset link.
     *
     * @param Request $request
     * @param string $response
     * @return JsonResponse
     */
    protected function sendResetLinkFailedResponse(Request $request, $response)
    {
        Log::debug("ForgotPasswordCircleController#sendResetLinkFailedResponse");

        return response()->json(['email' => trans($response)], 400);
    }
}
