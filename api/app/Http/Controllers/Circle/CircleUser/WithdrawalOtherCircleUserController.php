<?php

namespace App\Http\Controllers\Circle\CircleUser;

use App\Enum\Role;
use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Support\Arr;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class WithdrawalOtherCircleUserController extends Controller
{
    use Permission;

    /**
     * 自分以外をサークルを脱退する
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function __invoke(Request $request, int $circleId, int $userId)
    {
        Log::debug("WithdrawalOtherCircleUserController args", [
            'circleId' => $circleId,
        ]);

        /** @var \App\Models\User $authUser */
        $authUser = $request->user();
        $this->permissionCircle($authUser, $circleId, [Role::MANAGER]);

        if ($authUser->id === $userId) {
            Log::error(
                "[ERROR] WithdrawalOtherCircleUserController 自分自身をサークルから脱退させる場合は、WithdrawalOwnCircleUserControllerを使用してください",
                [
                    'circleId' => $circleId,
                    'userId'   => $userId,
                ]
            );

            return abort(403);
        }

        /** @var \App\Models\User $user */
        $user = User::whereActive(true)->findOrFail($userId);
        $this->permissionCircle($user, $circleId);

        DB::beginTransaction();
        try {
            $user->circleUsers()
                ->whereCircleId($circleId)
                ->delete();

            DB::commit();
        } catch (Exception $e) {
            Log::error("[ERROR] WithdrawalOtherCircleUserController", [
                'circleId' => $circleId,
            ]);
            DB::rollBack();
            throw $e;
        }
    }
}
