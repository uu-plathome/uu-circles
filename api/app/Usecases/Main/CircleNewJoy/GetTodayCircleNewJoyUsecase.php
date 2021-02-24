<?php

namespace App\Usecases\Main\CircleNewJoy;

use App\Enum\CircleNewJoyModel;
use App\Models\CircleNewJoy;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

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

        $todayCircleNewJoys = CircleNewJoy::with([
            'circle:id,slug,release',
            'circle.circleInformation:circle_id,circle_type,main_image_url'
        ])
            ->nowPublic($now)
            ->hasByNonDependentSubquery('circle', function ($query) {
                // 公開中のサークルのみ
                /** @var \App\Models\Circle $query */
                $query->whereRelease(true);
            })
            ->where(function ($query) use ($today) {
                /** @var \Illuminate\Database\Eloquent\Builder|\App\Models\CircleNewJoy $query */
                $query->whereDay(CircleNewJoyModel::start_date, $today)
                    ->orWhereDay(CircleNewJoyModel::end_date, $today);
            })
            ->orderByDesc(CircleNewJoyModel::start_date)
            ->get();

        $futureCircleNewJoys = CircleNewJoy::with([
            'circle:id,slug,release',
            'circle.circleInformation:circle_id,circle_type,main_image_url'
        ])
            ->nowPublic($now)
            ->hasByNonDependentSubquery('circle', function ($query) {
                // 公開中のサークルのみ
                /** @var \App\Models\Circle $query */
                $query->whereRelease(true);
            })
            ->where(function ($query) use ($today) {
                /** @var \Illuminate\Database\Eloquent\Builder|\App\Models\CircleNewJoy $query */
                $query->whereDay(CircleNewJoyModel::start_date, '>', $today);
            })
            ->orderByDesc(CircleNewJoyModel::start_date)
            ->take(10)
            ->get();

        return [
            'todayCircleNewJoys' => $todayCircleNewJoys->map(
                fn (CircleNewJoy $circleNewJoy) => [
                    'slug'                    => $circleNewJoy->circle['slug'],
                    'name'                    => $circleNewJoy->circle->circleInformation['name'],
                    'circle_type'             => $circleNewJoy->circle->circleInformation['circle_type'],
                    'main_image_url'          => $circleNewJoy->circle->circleInformation['main_image_url'],
                    'circleNewJoyValueObject' => CircleNewJoyValueObject::byEloquent($circleNewJoy)
                ]
            )->toArray(),
            'futureCircleNewJoys' => $futureCircleNewJoys->map(
                fn (CircleNewJoy $circleNewJoy) => [
                    'slug'                    => $circleNewJoy->circle['slug'],
                    'name'                    => $circleNewJoy->circle->circleInformation['name'],
                    'circle_type'             => $circleNewJoy->circle->circleInformation['circle_type'],
                    'main_image_url'          => $circleNewJoy->circle->circleInformation['main_image_url'],
                    'circleNewJoyValueObject' => circleNewJoyValueObject::byEloquent($circleNewJoy)
                ]
            )->toArray(),
        ];
    }
}
