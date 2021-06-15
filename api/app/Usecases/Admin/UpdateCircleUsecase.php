<?php

declare(strict_types=1);

namespace App\Usecases\Admin;

use App\Enum\Property\CircleInformationProperty;
use App\Enum\Role;
use App\Models\Circle;
use App\Models\CircleHandbill;
use App\Support\Arr;
use App\ValueObjects\CircleValueObject;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class UpdateCircleUsecase
{
    /**
     * invoke.
     *
     * @param CircleValueObject $circleValueObject
     * @param string            $role
     *
     * @throws Exception
     *
     * @return CircleValueObject
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
            Arr::except($circleValueObject->toArray(), [
                'is_main_fixed',
                CircleInformationProperty::wp_url,
                CircleInformationProperty::is_view_wp_post,
            ]);

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
