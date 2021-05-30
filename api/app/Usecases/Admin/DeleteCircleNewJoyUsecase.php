<?php

declare(strict_types=1);

namespace App\Usecases\Admin;

use App\Models\CircleNewJoy;
use Exception;
use Illuminate\Support\Facades\DB;

final class DeleteCircleNewJoyUsecase
{
    /**
     * 新歓情報の削除
     *
     * @param int $circleId
     * @param int $circleNewJoyId
     * @return bool
     * @throws Exception
     */
    public function invoke(int $circleId, int $circleNewJoyId): bool
    {
        DB::beginTransaction();

        try {
            CircleNewJoy::whereCircleId($circleId)->findOrFail($circleNewJoyId)->delete();
            DB::commit();

            return true;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
