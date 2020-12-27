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
        $circle = $circleValueObject->toCircleModel();
        $circleInformation = $circleValueObject->toCircleInformationModel();

        DB::beginTransaction();
        try {
            $circle->save();
            $circle->circleInformation->fill($circleInformation->toArray())->save();

            DB::commit();

            $circle = Circle::whereId($circle->id)->firstOrFail();
            return CircleValueObject::byEloquent(
                $circle,
                $circle->circleInformation
            );
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
