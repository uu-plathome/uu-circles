<?php

namespace App\Http\Controllers\Circle\CircleUser;

use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Support\Arr;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class WithdrawalCircleUserController extends Controller
{
    use Permission;

    /**
     * サークルを脱退する
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function __invoke(Request $request, int $circleId)
    {
        Log::debug("WithdrawalCircleUserController args", [
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
            Log::error("[ERROR] WithdrawalCircleUserController", [
                'circleId' => $circleId,
            ]);
            DB::rollBack();
            throw $e;
        }
    }
}
