<?php

namespace App\Usecases\Main\CircleNewJoy;

use App\Enum\CircleNewJoyModel;
use App\Models\CircleNewJoy;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Support\Carbon;

class GetTodayCircleNewJoyWithLimitUsecase
{
    /**
     * 今日の新歓
     * 今日〜未来にかけて、最大$limit件取得する
     *
     * @return void
     */
    public function invoke(int $limit = 6)
    {
        $now = Carbon::now();
        $today = Carbon::today();

        $todayCircleNewJoy = CircleNewJoy::with([
            'circle:id,slug,release',
            'circle.circleInformation:circle_id,circle_type,main_image_url'
        ])
            ->nowPublic($now)
            ->hasByNonDependentSubquery('circle', function ($query) {
                // 公開中のサークルのみ
                /** @var \App\Models\Circle $query */
                $query->whereRelease(true);
            })
            ->whereDay(CircleNewJoyModel::start_date, '>=', $today)
            ->orderByDesc(CircleNewJoyModel::start_date)
            ->take($limit)
            ->get();

        return [
            'todayCircleNewJoys' => $todayCircleNewJoy->map(
                fn (CircleNewJoy $circleNewJoy) => [
                    'slug'                    => $circleNewJoy->circle['slug'],
                    'name'                    => $circleNewJoy->circle->circleInformation['name'],
                    'circle_type'             => $circleNewJoy->circle->circleInformation['circle_type'],
                    'main_image_url'          => $circleNewJoy->circle->circleInformation['main_image_url'],
                    'circleNewJoyValueObject' => CircleNewJoyValueObject::byEloquent($circleNewJoy)
                ]
            )->toArray(),
        ];
    }
}
