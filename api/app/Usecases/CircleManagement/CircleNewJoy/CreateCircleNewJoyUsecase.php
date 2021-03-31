<?php

namespace App\Usecases\CircleManagement\CircleNewJoy;

use App\Enum\Property\CircleNewJoyProperty as Property;
use App\Models\Circle;
use App\Usecases\CircleManagement\CircleNewJoy\Params\CreateCircleNewJoyUsecaseParam;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CreateCircleNewJoyUsecase
{
    /**
     * 新規新歓を追加する
     *
     * @return void
     * @throws Exception
     */
    public function invoke(
        CreateCircleNewJoyUsecaseParam $param
    ) {
        Log::debug("CreateCircleNewJoyUsecase args", [
            'CreateCircleNewJoyUsecaseParam' => $param,
        ]);

        $circleId = $param->circle_id;
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
            $circle = Circle::findOrFail($circleId);
            $circle->circleNewJoys()->create($newCircleNewJoy);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            Log::error("[ERROR] CreateCircleNewJoyUsecase", [
                'CreateCircleNewJoyUsecaseParam' => $param,
            ]);

            throw $e;
        }
    }
}
