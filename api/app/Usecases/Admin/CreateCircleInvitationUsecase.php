<?php

namespace App\Usecases\Admin;

use App\Models\CircleInvitation;
use Illuminate\Support\Facades\DB;

class CreateCircleInvitationUsecase
{
    /**
     * サークルの招待レコードを作成する
     *
     * @param int $circleId
     * @param int $createdUserId
     * @return void
     * @throws \Exception
     */
    public function invoke(int $circleId, int $createdUserId)
    {
        DB::beginTransaction();

        try {
            (new CircleInvitation())->fill([
                'circle_id'       => $circleId,
                'token'           => CircleInvitation::generateToken(),
                'active'          => true,
                'created_user_id' => $createdUserId,
            ])->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
