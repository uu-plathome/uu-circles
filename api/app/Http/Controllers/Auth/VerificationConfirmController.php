<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class VerificationConfirmController extends Controller
{
    /**
     * Mark the user's email address as verified.
     *
     * @param Request $request
     * @param int $userId
     * @return JsonResponse
     */
    public function __invoke(Request $request, int $userId)
    {
        // 有効な署名かどうか
        if (! URL::hasValidSignature($request)) {
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

        $request->validate([
            'password' => ['string', 'required', 'min:8'],
        ]);

        $user->markEmailAndPasswordAsVerified($request->get('password'));

        event(new Verified($user));

        return response()->json([
            'status' => __('verification.verified'),
        ]);
    }
}
