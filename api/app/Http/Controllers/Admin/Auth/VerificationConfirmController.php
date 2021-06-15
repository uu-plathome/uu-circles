<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\VerificationConfirmRequest;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\URL;

final class VerificationConfirmController extends Controller
{
    /**
     * Mark the user's email address as verified.
     *
     * @param VerificationConfirmRequest $request
     * @param int                        $userId
     *
     * @return JsonResponse
     */
    public function __invoke(VerificationConfirmRequest $request, int $userId): JsonResponse
    {
        // 有効な署名かどうか
        if (!URL::hasValidSignature($request)) {
            return response()->json([
                'status' => __('verification.invalid'),
            ], 400);
        }

        $user = User::whereAdminUser()->findOrFail($userId);

        // すでに認証されているかどうか
        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'status' => __('verification.already_verified'),
            ], 400);
        }

        $user->markEmailAndPasswordAsVerified($request->get('password'));

        return response()->json([
            'status' => __('verification.verified'),
        ]);
    }
}
