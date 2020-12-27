<?php

namespace App\Usecases\Admin;

use App\Models\Circle;
use App\ValueObjects\CircleValueObject;
use Illuminate\Support\Facades\DB;
use Exception;

class UpdateCircleUsecase
{
    /**
     * invoke
     *
     * @param CircleValueObject $circleValueObject
     * @return CircleValueObject
     * @throws Exception
     */
    public function invoke(CircleValueObject $circleValueObject): CircleValueObject
    {
        DB::beginTransaction();

        try {
            $circle = $circleValueObject->toCircleModel();
            $circle->save();

            DB::commit();
            return CircleValueObject::byEloquent(Circle::whereId($circle->id)->firstOrFail());
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
