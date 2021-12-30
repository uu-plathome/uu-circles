<?php

declare(strict_types=1);

namespace App\UseCases\AdminManagement\DemoCircleNewJoy;

use App\Enum\Property\DemoCircleNewJoyProperty as Property;
use App\Models\Circle;
use App\UseCases\AdminManagement\DemoCircleNewJoy\Params\CreateDemoCircleNewJoyUsecaseParam;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class CreateDemoCircleNewJoyUsecase
{
    /**
     * 新規新歓を追加する.
     *
     * @throws Exception
     *
     * @return void
     */
    public function invoke(
        CreateDemoCircleNewJoyUsecaseParam $param
    ) {
        Log::debug('CreateDemoCircleNewJoyUsecase args', [
            'CreateDemoCircleNewJoyUsecaseParam' => $param,
        ]);

        $circleId = $param->circle_id;
        $newDemoCircleNewJoy = [
            Property::title                    => $param->title,
            Property::description              => $param->description,
            Property::url                      => $param->url,
            Property::place_of_activity        => $param->place_of_activity,
            Property::place_of_activity_detail => $param->place_of_activity_detail,
            Property::demo_circle_newjoy_type  => $param->demo_circle_newjoy_type,
            Property::start_date               => $param->start_date,
            Property::end_date                 => $param->end_date,
            Property::published                => $param->published,
        ];

        DB::beginTransaction();

        try {
            $circle = Circle::findOrFail($circleId);
            $circle->demoCircleNewJoys()->create($newDemoCircleNewJoy);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            Log::error('[ERROR] CreateDemoCircleNewJoyUsecase', [
                'CreateDemoCircleNewJoyUsecaseParam' => $param,
            ]);

            throw $e;
        }
    }
}
