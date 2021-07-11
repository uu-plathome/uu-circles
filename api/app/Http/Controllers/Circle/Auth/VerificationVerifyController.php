<?php

declare(strict_types=1);

namespace App\Http\Controllers\Circle\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;

final class VerificationVerifyController extends Controller
{
    /**
     * Mark the user's email address as verified.
     *
     * @param Request $request
     * @param int     $userId
     *
     * @return JsonResponse
     */
    public function __invoke(Request $request, int $userId): JsonResponse
    {
        Log::debug("VerificationResendController args userId=$userId");

        // 有効な署名かどうか
        if (!URL::hasValidSignature($request)) {
            return response()->json([
                'status' => __('verification.invalid'),
            ], 400);
        }

        $user = User::findOrFail($userId);
        // CircleUserであるかどうか
        if (!$user->isCircleUser()) {
            return response()->json([
                'status' => '有効なURLではありません。再登録し直して下さい。',
            ]);
        }

        // すでに認証されているかどうか
        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'status' => __('verification.already_verified'),
            ], 400);
        }

        return response()->json([
            'status' => true,
        ]);
    }
}
