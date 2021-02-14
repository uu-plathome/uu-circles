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

        $todayCircleNewJoy = CircleNewJoy::with('circle')
            ->nowPublic($now)
            ->whereDay(CircleNewJoyModel::start_date, '>=', $today)
            ->orderByDesc(CircleNewJoyModel::start_date)
            ->take($limit)
            ->get();

        return [
            'todayCircleNewJoys' => $todayCircleNewJoy->map(
                fn (CircleNewJoy $circleNewJoy) => [
                    'slug'         => $circleNewJoy->circle['slug'],
                    'circleNewJoyValueObject' => CircleNewJoyValueObject::byEloquent($circleNewJoy)
                ]
            )->toArray(),
        ];
    }
}
