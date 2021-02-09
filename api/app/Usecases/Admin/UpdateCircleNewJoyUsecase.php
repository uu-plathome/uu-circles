<?php

namespace App\Usecases\Admin;

use App\Models\Circle;
use App\Models\CircleNewJoy;
use App\ValueObjects\CircleNewJoyValueObject;
use Exception;
use Illuminate\Support\Facades\DB;

class UpdateCircleNewJoyUsecase
{
    /**
     * 新規新歓を更新する
     *
     * @param int $circleId
     * @param int $circleNewJoyId
     * @param CircleNewJoyValueObject $circleNewJoyValueObject
     * @return void
     * @throws Exception
     */
    public function invoke(
        int $circleId,
        int $circleNewJoyId,
        CircleNewJoyValueObject $circleNewJoyValueObject
    ) {
        $newCircleNewJoy = $circleNewJoyValueObject->except(['id', 'circle_id']);

        DB::beginTransaction();
        try {
            CircleNewJoy::whereCircleId($circleId)
                ->whereId($circleNewJoyId)
                ->firstOrFail()
                ->update($newCircleNewJoy);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
