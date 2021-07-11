<?php

declare(strict_types=1);

namespace App\Http\Controllers\Circle\Auth;

use App\Enum\Property\UserProperty;
use App\Http\Controllers\Controller;
use App\Http\Requests\Circle\Auth\VerificationResendCircleUserFormRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

final class VerificationResendController extends Controller
{
    /**
     * 認証用のメールを再通知.
     *
     * @param VerificationResendCircleUserFormRequest $request
     *
     * @throws ValidationException
     *
     * @return JsonResponse
     */
    public function __invoke(VerificationResendCircleUserFormRequest $request): JsonResponse
    {
        Log::debug('VerificationResendController args none');

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
