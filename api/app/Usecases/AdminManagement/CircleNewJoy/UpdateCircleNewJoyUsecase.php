<?php

declare(strict_types=1);

namespace App\Usecases\AdminManagement\CircleNewJoy;

use App\Enum\Property\CircleNewJoyProperty;
use App\Models\CircleNewJoy;
use App\Usecases\AdminManagement\CircleNewJoy\Params\UpdateCircleNewJoyUsecaseParam;
use Exception;
use Illuminate\Support\Facades\DB;

final class UpdateCircleNewJoyUsecase
{
    /**
     * 新規新歓を更新する.
     *
     * @param UpdateCircleNewJoyUsecaseParam $param
     *
     * @throws Exception
     *
     * @return void
     */
    public function invoke(
        UpdateCircleNewJoyUsecaseParam $param
    ) {
        $insertDataForCircleNewJoy = $this->insertData($param);
        $circleId = $param->circle_id;
        $circleNewJoyId = $param->circle_new_joy_id;

        DB::beginTransaction();

        try {
            CircleNewJoy::whereCircleId($circleId)
                ->whereId($circleNewJoyId)
                ->firstOrFail()
                ->update($insertDataForCircleNewJoy);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }
    }

    public function insertData(UpdateCircleNewJoyUsecaseParam $param): array
    {
        return [
            CircleNewJoyProperty::title                    => $param->title,
            CircleNewJoyProperty::description              => $param->description,
            CircleNewJoyProperty::url                      => $param->url,
            CircleNewJoyProperty::private_newjoy_link      => $param->private_newjoy_url,
            CircleNewJoyProperty::place_of_activity        => $param->place_of_activity,
            CircleNewJoyProperty::place_of_activity_detail => $param->place_of_activity_detail,
            CircleNewJoyProperty::publish_from             => $param->publish_from,
            CircleNewJoyProperty::start_date               => $param->start_date,
            CircleNewJoyProperty::end_date                 => $param->end_date,
            CircleNewJoyProperty::release                  => $param->release,
        ];
    }
}
