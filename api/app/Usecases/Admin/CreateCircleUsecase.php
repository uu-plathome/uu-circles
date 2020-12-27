<?php

namespace App\Admin\Usecases;

use App\ValueObjects\CircleValueObject;
use Exception;
use Illuminate\Support\Facades\DB;

class CreateCircleUsecase
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
        $circle = $circleValueObject->toCircleModel();
        $circle->createSlugWhenSlugNotExist();

        try {
            $circle->save();

            DB::commit();

            return CircleValueObject::byEloquent($circle);
        } catch (Exception $e) {
            DB::rollBack();
        }
    }
}
