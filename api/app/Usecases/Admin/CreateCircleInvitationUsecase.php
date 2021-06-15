<?php

declare(strict_types=1);

namespace App\Usecases\Admin;

use App\Models\CircleInvitation;
use Exception;
use Illuminate\Support\Facades\DB;

final class CreateCircleInvitationUsecase
{
    /**
     * サークルの招待レコードを作成する.
     *
     * @param int $circleId
     * @param int $createdUserId
     *
     * @throws \Exception
     *
     * @return void
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
