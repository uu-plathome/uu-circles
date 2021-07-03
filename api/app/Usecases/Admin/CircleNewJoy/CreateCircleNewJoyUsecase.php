<?php

declare(strict_types=1);

namespace App\Usecases\Admin\CircleNewJoy;

use App\Enum\Property\CircleNewJoyProperty;
use App\Models\Circle;
use App\Usecases\Admin\CircleNewJoy\Params\CreateCircleNewJoyUsecaseParam;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class CreateCircleNewJoyUsecase
{
    /**
     * 新規新歓を追加する.
     *
     * @param CreateCircleNewJoyUsecaseParam $param
     * @return void
     * @throws Exception
     */
    public function invoke(CreateCircleNewJoyUsecaseParam $param)
    {
        Log::debug('CreateCircleNewJoyUsecase args', [
            'CreateCircleNewJoyUsecaseParam' => $param,
        ]);

        $insertDataForCircleNewJoy = $this->insertData($param);

        DB::beginTransaction();
        try {
            $circle = Circle::findOrFail($param->circle_id);
            $circle->circleNewJoys()->create($insertDataForCircleNewJoy);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }
    }

    public function insertData(CreateCircleNewJoyUsecaseParam $param): array
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
