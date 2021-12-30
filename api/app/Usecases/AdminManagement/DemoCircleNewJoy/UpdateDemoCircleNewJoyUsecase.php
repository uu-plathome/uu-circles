<?php

declare(strict_types=1);

namespace App\Usecases\Admin\DemoCircleNewJoy;

use App\Enum\Property\DemoCircleNewJoyProperty as Property;
use App\Models\DemoCircleNewjoy;
use App\Usecases\Admin\DemoCircleNewJoy\Params\UpdateDemoCircleNewJoyUsecaseParam;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class UpdateDemoCircleNewJoyUsecase
{
    /**
     * 新歓情報を更新する.
     *
     * @param UpdateDemoCircleNewJoyUsecaseParam $param
     *
     * @throws Exception
     *
     * @return void
     */
    public function invoke(
        UpdateDemoCircleNewJoyUsecaseParam $param
    ) {
        Log::debug('UpdateDemoCircleNewJoyUsecase args', [
            'UpdateDemoCircleNewJoyUsecaseParam' => $param,
        ]);

        $demoCircleNewJoyId = $param->demo_circle_newjoy_id;
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
            DemoCircleNewjoy::findOrFail($demoCircleNewJoyId)
                ->update($newDemoCircleNewJoy);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            Log::error('[ERROR] UpdateDemoCircleNewJoyUsecase', [
                'UpdateDemoCircleNewJoyUsecaseParam' => $param,
            ]);

            throw $e;
        }
    }
}
