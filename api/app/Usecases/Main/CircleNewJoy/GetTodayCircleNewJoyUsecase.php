<?php

namespace App\Usecases\Main\CircleNewJoy;

use App\Enum\CircleNewJoyModel;
use App\Models\CircleNewJoy;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Support\Carbon;

class GetTodayCircleNewJoyUsecase
{
    /**
     * 今日の新歓
     * 
     * 今日の新歓と明日以降の10件の新歓を取得
     *
     * @return void
     */
    public function invoke()
    {
        $now = Carbon::now();
        $today = Carbon::today();

        $todayCircleNewJoy = CircleNewJoy::with('circle')->nowPublic($now)
            ->where(function ($query) use ($today) {
                /** @var \Illuminate\Database\Eloquent\Builder|\App\Models\CircleNewJoy $query */
                $query->whereDay(CircleNewJoyModel::start_date, $today)
                    ->orWhereDay(CircleNewJoyModel::end_date, $today);
            })
            ->orderByDesc(CircleNewJoyModel::start_date)
            ->get();

        $futureCircleNewJoy = CircleNewJoy::with('circle')->nowPublic($now)
            ->where(function ($query) use ($today) {
                /** @var \Illuminate\Database\Eloquent\Builder|\App\Models\CircleNewJoy $query */
                $query->whereDay(CircleNewJoyModel::start_date, '>', $today);
            })
            ->orderByDesc(CircleNewJoyModel::start_date)
            ->take(10)
            ->get();

        return [
            'todayCircleNewJoys' => $todayCircleNewJoy->map(
                fn (CircleNewJoy $circleNewJoy) => [
                    'slug'         => $circleNewJoy->circle['slug'],
                    'circleNewJoyValueObject' => CircleNewJoyValueObject::byEloquent($circleNewJoy)
                ]
            )->toArray(),
            'futureCircleNewJoys' => $futureCircleNewJoy->map(
                fn (CircleNewJoy $circleNewJoy) => [
                    'slug'         => $circleNewJoy->circle['slug'],
                    'circleNewJoyValueObject' => circleNewJoyValueObject::byEloquent($circleNewJoy)
                ]
            )->toArray(),
        ];
    }
}
