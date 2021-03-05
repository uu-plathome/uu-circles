<?php

namespace App\Usecases\Admin;

use App\Enum\Property\CircleInformationProperty;
use App\Enum\Property\CircleProperty;
use App\Enum\Role;
use App\Models\Circle;
use App\Models\CircleHandbill;
use App\Support\Arr;
use App\ValueObjects\CircleValueObject;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Log;

class UpdateCircleUsecase
{
    /**
     * invoke
     *
     * @param CircleValueObject $circleValueObject
     * @return CircleValueObject
     * @throws Exception
     */
    public function invoke(CircleValueObject $circleValueObject, string $role): CircleValueObject
    {
        Log::debug('UpdateCircleUsecase args', [
            'circleValueObject' => $circleValueObject,
            'role'              => $role,
        ]);

        DB::beginTransaction();

        // システム管理者のときはis_main_fixedを変更でき、それ以外は変更できない。
        $circle = $role === Role::SYSTEM ?
            $circleValueObject->toArray() :
            Arr::except($circleValueObject->toArray(), ['is_main_fixed']);

        try {
            /** @var Circle $newCircle */
            $newCircle = Circle::whereId($circleValueObject->id)->firstOrFail();
            $newCircle->fill($circle)->save();
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
