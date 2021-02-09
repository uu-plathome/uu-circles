<?php

namespace App\Usecases\Admin;

use App\Enum\CircleInformationModel;
use App\Enum\CircleModel;
use App\Models\Circle;
use App\Models\CircleHandbill;
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

            if ($circleValueObject->handbill_image_url) {
                $circleHandbill = CircleHandbill::whereCircleId($newCircle->id)->first();

                if ($circleHandbill) {
                    $circleHandbill->update([
                        'image_url' => $circleValueObject->handbill_image_url,
                    ]);
                } else {
                    CircleHandbill::create([
                        'circle_id' => $newCircle->id,
                        'image_url' => $circleValueObject->handbill_image_url,
                        'year'      => 2021,
                    ]);
                }
            }

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
