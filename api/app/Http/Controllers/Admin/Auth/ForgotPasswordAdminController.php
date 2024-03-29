<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\ForgotPasswordAdminRequest;
use App\Models\User;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

final class ForgotPasswordAdminController extends Controller
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

    /**
     * User がシステム管理者でなく、サークル管理者のときはエラーステータス.
     */
    const IS_ONLY_CIRCLE_USER_ERROR_STATUS = 'IS_ONLY_CIRCLE_USER_ERROR_STATUS';

    public function __invoke(ForgotPasswordAdminRequest $request)
    {
        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $response = $this->broker()->sendResetLink(
            $this->credentials($request)
        );

        /**
         * User がシステム管理者でなく、サークル管理者のときはエラーを飛ばす。
         */
        $isOnlyCircleUser = User::whereEmail($request->email)
            ->whereDoesntHave('adminUser')
            ->whereHas('circleUsers')
            ->exists();
        if ($isOnlyCircleUser) {
            return response()->json([
                'errors' => [
                    'email' => [
                        self::IS_ONLY_CIRCLE_USER_ERROR_STATUS,
                    ],
                ],
            ], 422);
        }

        // パスワードリセット
        return $response == Password::RESET_LINK_SENT
            ? $this->sendResetLinkResponse($request, $response)
            : $this->sendResetLinkFailedResponse($request, $response);
    }

    /**
     * Get the response for a successful password reset link.
     *
     * @param Request $request
     * @param string  $response
     *
     * @return RedirectResponse|int[]
     */
    protected function sendResetLinkResponse(Request $request, $response)
    {
        return ['status' => trans($response)];
    }

    /**
     * Get the response for a failed password reset link.
     *
     * @param Request $request
     * @param string  $response
     *
     * @return JsonResponse
     */
    protected function sendResetLinkFailedResponse(Request $request, $response)
    {
        return response()->json(['email' => trans($response)], 400);
    }
}
