<?php

namespace App\Http\Controllers\Circle\Auth;

use App\Enum\Property\UserProperty;
use App\Http\Controllers\Controller;
use App\Http\Requests\Circle\Auth\VerificationResendCircleUserFormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class VerificationResendController extends Controller
{
    /**
     * 認証用のメールを再通知
     *
     * @param VerificationResendCircleUserFormRequest $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function __invoke(VerificationResendCircleUserFormRequest $request): JsonResponse
    {
        $email = $request->get(UserProperty::email);

        try {
            $user = User::whereEmail($email)->firstOrFail();
        } catch (Exception $e) {
            throw ValidationException::withMessages([
                'email' => [__('verification.user')],
            ]);
        }

        if ($user->hasVerifiedEmail()) {
            throw ValidationException::withMessages([
                'email' => [__('verification.already_verified')],
            ]);
        }

        // 認証用のメールを通知
        $user->sendEmailVerificationCircleUserNotification();

        return response()->json(['status' => __('verification.sent')]);
    }
}
