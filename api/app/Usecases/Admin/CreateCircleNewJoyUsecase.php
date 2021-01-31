<?php

namespace App\Usecases\Admin;

use App\Models\Circle;
use App\ValueObjects\CircleNewJoyValueObject;
use Exception;
use Illuminate\Support\Facades\DB;

class CreateCircleNewJoyUsecase
{
    /**
     * 新規新歓を追加する
     *
     * @param int $circleId
     * @param CircleNewJoyValueObject $circleNewJoyValueObject
     * @return void
     * @throws Exception
     */
    public function invoke(int $circleId, CircleNewJoyValueObject $circleNewJoyValueObject)
    {
        $circleNewJoy = $circleNewJoyValueObject->toArray();

        DB::beginTransaction();
        try {
            $circle = Circle::findOrFail($circleId);
            $circle->circleNewJoys()->create($circleNewJoy);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
