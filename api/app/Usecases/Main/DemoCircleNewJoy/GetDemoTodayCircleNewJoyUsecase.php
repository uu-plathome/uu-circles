<?php

declare(strict_types=1);

namespace App\Usecases\Main\DemoCircleNewJoy;

use App\Enum\DemoCircleNewjoyType;
use App\Enum\Property\DemoCircleNewJoyProperty;
use App\Models\DemoCircleNewjoy;
use App\Usecases\Main\DemoCircleNewJoy\Dto\DemoCircleNewJoyDto;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

final class GetDemoTodayCircleNewJoyUsecase
{
    /**
     * 今日の新歓のデモを取得
     *
     * @return array
     */
    public function invoke(): array
    {
        Log::debug('GetDemoTodayCircleNewJoyUsecase args: none');

        $now = Carbon::now();
        $today = Carbon::today();

        $fetchCircleNewJoys = DemoCircleNewjoy::with([
            'circle:id,slug,release,name',
            'circle.circleInformation:circle_id,circle_type,short_name,main_image_url',
        ])
            ->hasByNonDependentSubquery('circle', function ($query) {
                // 公開中のサークルのみ
                /** @var \App\Models\Circle $query */
                $query->whereRelease(true);
            })
            ->orderByDesc(DemoCircleNewJoyProperty::start_date)
            ->get();

        $todayCircleNewJoys = $fetchCircleNewJoys->filter(
            fn (DemoCircleNewJoy $circleNewJoy) =>
                $circleNewJoy->demo_circle_newjoy_type === DemoCircleNewjoyType::TODAY
        );
        $futureCircleNewJoys = $fetchCircleNewJoys->filter(
            fn (DemoCircleNewJoy $circleNewJoy) =>
                $circleNewJoy->demo_circle_newjoy_type === DemoCircleNewjoyType::TODAY
        );

        return [
            'todayCircleNewJoys' => $todayCircleNewJoys
                ->sortBy(DemoCircleNewJoyProperty::start_date)
                ->map(
                    fn (DemoCircleNewJoy $circleNewJoy) => [
                        'slug'                    => $circleNewJoy->circle['slug'],
                        'name'                    => $circleNewJoy->circle['name'],
                        'short_name'              => $circleNewJoy->circle->circleInformation['short_name'],
                        'circle_type'             => $circleNewJoy->circle->circleInformation['circle_type'],
                        'main_image_url'          => $circleNewJoy->circle->circleInformation['main_image_url'],
                        'circleNewJoyValueObject' => DemoCircleNewJoyDto::byEloquent($circleNewJoy),
                    ]
                )->toArray(),
            'futureCircleNewJoys' => $futureCircleNewJoys
                ->sortBy(DemoCircleNewJoyProperty::start_date)
                ->map(
                    fn (DemoCircleNewJoy $circleNewJoy) => [
                        'slug'                    => $circleNewJoy->circle['slug'],
                        'name'                    => $circleNewJoy->circle['name'],
                        'short_name'              => $circleNewJoy->circle->circleInformation['short_name'],
                        'circle_type'             => $circleNewJoy->circle->circleInformation['circle_type'],
                        'main_image_url'          => $circleNewJoy->circle->circleInformation['main_image_url'],
                        'circleNewJoyValueObject' => DemoCircleNewJoyDto::byEloquent($circleNewJoy),
                    ]
                )->toArray(),
        ];
    }
}
