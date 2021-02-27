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
        $circle = $circleValueObject->toCircleProperty();
        $circle->createSlugWhenSlugNotExist();
        $circleInformation = $circleValueObject->toCircleInformationProperty();

        DB::beginTransaction();
        try {
            $circle->save();
            $circle->circleInformation()->create($circleInformation->toArray());

            DB::commit();

            return CircleValueObject::byEloquent($circle, $circleInformation, null);
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
