<?php

namespace App\Usecases\Admin;

use App\Models\Circle;
use App\ValueObjects\CircleNewJoyValueObject;
use Exception;
use Illuminate\Support\Facades\DB;

class UpdateCircleNewJoyUsecase
{
    /**
     * 新規新歓を更新する
     *
     * @return void
     */
    public function invoke(
        int $circleId,
        int $circleNewJoyId,
        CircleNewJoyValueObject $circleNewJoyValueObject
    ) {
        $newCircleNewJoy = $circleNewJoyValueObject->toArray();

        DB::beginTransaction();
        try {
            $circle = Circle::findOrFail($circleId);
            $oldCircleNewJoy = $circle->circleNewJoys->find($circleNewJoyId);
            $oldCircleNewJoy->delete();
            $circle->circleNewJoys()->create($newCircleNewJoy);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
