<?php

namespace App\Usecases\CircleManagement\CircleNewJoy;

use App\Enum\Property\CircleNewJoyProperty as Property;
use App\Models\CircleNewJoy;
use App\Usecases\CircleManagement\CircleNewJoy\Params\UpdateCircleNewJoyUsecaseParam;
use App\ValueObjects\CircleNewJoyValueObject;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdateCircleNewJoyUsecase
{
    /**
     * 新歓情報を更新する
     *
     * @param int $circleId
     * @param int $circleNewJoyId
     * @param CircleNewJoyValueObject $circleNewJoyValueObject
     * @return void
     * @throws Exception
     */
    public function invoke(
        UpdateCircleNewJoyUsecaseParam $param
    ) {
        Log::debug("UpdateCircleNewJoyUsecase args", [
            'UpdateCircleNewJoyUsecaseParam' => $param,
        ]);

        $circleId = $param->circle_id;
        $circleNewJoyId = $param->circle_newjoy_id;
        $newCircleNewJoy = [
            Property::title                    => $param->title,
            Property::description              => $param->description,
            Property::url                      => $param->url,
            Property::private_newjoy_link      => $param->private_newjoy_link,
            Property::place_of_activity        => $param->place_of_activity,
            Property::place_of_activity_detail => $param->place_of_activity_detail,
            Property::publish_from             => $param->publish_from,
            Property::start_date               => $param->start_date,
            Property::end_date                 => $param->end_date,
            Property::release                  => $param->release,
        ];

        DB::beginTransaction();
        try {
            CircleNewJoy::whereCircleId($circleId)
                ->findOrFail($circleNewJoyId)
                ->update($newCircleNewJoy);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            Log::error("[ERROR] UpdateCircleNewJoyUsecase", [
                'UpdateCircleNewJoyUsecaseParam' => $param,
            ]);

            throw $e;
        }
    }
}
