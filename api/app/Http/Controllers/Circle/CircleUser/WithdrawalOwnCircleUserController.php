<?php

declare(strict_types=1);

namespace App\Http\Controllers\Circle\CircleUser;

use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class WithdrawalOwnCircleUserController extends Controller
{
    use Permission;

    /**
     * 自分をサークルを脱退する
     *
     * @param \Illuminate\Http\Request $request
     * @param int $circleId
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function __invoke(Request $request, int $circleId)
    {
        Log::debug("WithdrawalOwnCircleUserController args", [
            'circleId' => $circleId,
        ]);

        /** @var \App\Models\User $authUser */
        $authUser = $request->user();
        $this->permissionCircle($authUser, $circleId);

        DB::beginTransaction();
        try {
            $authUser->circleUsers()
                ->whereCircleId($circleId)
                ->delete();

            DB::commit();
        } catch (Exception $e) {
            Log::error("[ERROR] WithdrawalOwnCircleUserController", [
                'circleId' => $circleId,
            ]);
            DB::rollBack();
            throw $e;
        }
    }
}
