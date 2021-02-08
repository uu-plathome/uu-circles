<?php

namespace App\Usecases\Admin;

use App\Enum\CircleInformationModel;
use App\Enum\CircleModel;
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
            /** @var Circle $newCircle */
            $newCircle = Circle::whereId($circleValueObject->id)->firstOrFail();
            $newCircle->fill($circleValueObject->toArray())->save();
            $newCircle->circleInformation->fill($circleValueObject->toArray())->save();
            $newCircle->circleHandbill->fill($circleValueObject->toArray())->save();

            DB::commit();

            return CircleValueObject::byEloquent(
                $newCircle,
                $newCircle->circleInformation,
                $newCircle->circleHandbill
            );
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
