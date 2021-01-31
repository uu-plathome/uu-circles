<?php

namespace App\Http\Controllers\Admin\CircleUser;

use App\Enum\UserModel;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CircleUser\SendRegisterEmailCircleUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class SendRegisterEmailCircleUserController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param SendRegisterEmailCircleUserRequest $request
     * @param int $circleId
     * @return \Illuminate\Http\Response
     * @throws ValidationException
     */
    public function __invoke(SendRegisterEmailCircleUserRequest $request, int $circleId)
    {
        $email = $request->get(UserModel::email);

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
