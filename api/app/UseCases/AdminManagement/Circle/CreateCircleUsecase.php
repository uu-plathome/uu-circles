<?php

declare(strict_types=1);

namespace App\UseCases\AdminManagement\Circle;

use App\ValueObjects\CircleValueObject;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class CreateCircleUsecase
{
    /**
     * invoke.
     *
     * @param CircleValueObject $circleValueObject
     *
     * @throws Exception
     *
     * @return CircleValueObject
     */
    public function invoke(CircleValueObject $circleValueObject): CircleValueObject
    {
        Log::debug('CreateCircleUsecase args', [
            'CircleUserValueObject' => $circleValueObject,
        ]);

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
