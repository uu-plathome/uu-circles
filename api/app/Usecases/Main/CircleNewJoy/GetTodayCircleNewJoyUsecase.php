<?php

namespace App\Usecases\Main\CircleNewJoy;

use App\Enum\Property\CircleNewJoyProperty;
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
     * @return array
     */
    public function invoke(): array
    {
        Log::debug("#GetTodayCircleNewJoyUsecase args: none");

        $now = Carbon::now();
        $today = Carbon::today();

        $todayCircleNewJoysQuery = CircleNewJoy::with([
            'circle:id,slug,release,name',
            'circle.circleInformation:circle_id,circle_type,short_name,main_image_url'
        ])
            ->nowPublic($now)
            ->hasByNonDependentSubquery('circle', function ($query) {
                // 公開中のサークルのみ
                /** @var \App\Models\Circle $query */
                $query->whereRelease(true);
            })
            ->where(function ($query) use ($today) {
                /** @var \Illuminate\Database\Eloquent\Builder|\App\Models\CircleNewJoy $query */
                $query->whereDate(CircleNewJoyProperty::start_date, $today)
                    ->orWhereDate(CircleNewJoyProperty::end_date, $today);
            })
            ->orderByDesc(CircleNewJoyProperty::start_date);

        $fetchCircleNewJoys = CircleNewJoy::with([
            'circle:id,slug,release,name',
            'circle.circleInformation:circle_id,circle_type,short_name,main_image_url'
        ])
            ->nowPublic($now)
            ->hasByNonDependentSubquery('circle', function ($query) {
                // 公開中のサークルのみ
                /** @var \App\Models\Circle $query */
                $query->whereRelease(true);
            })
            ->where(function ($query) use ($today) {
                /** @var \Illuminate\Database\Eloquent\Builder|\App\Models\CircleNewJoy $query */
                $query->whereDate(CircleNewJoyProperty::start_date, '>', $today);
            })
            ->orderBy(CircleNewJoyProperty::start_date, 'asc')
            ->take(10)
            ->union($todayCircleNewJoysQuery)
            ->get();

        $todayCircleNewJoys = $fetchCircleNewJoys->filter(
            fn (CircleNewJoy $circleNewJoy) => ($circleNewJoy->start_date && $today->isSameDay($circleNewJoy->start_date->format('Y-m-d'))) ||
                ($circleNewJoy->end_date && $today->isSameDay($circleNewJoy->end_date->format('Y-m-d')))
        );
        $futureCircleNewJoys = $fetchCircleNewJoys->filter(
            fn (CircleNewJoy $circleNewJoy) => !$today->isSameDay($circleNewJoy->start_date)
        );

        return [
            'todayCircleNewJoys' => $todayCircleNewJoys->sortBy('start_date')
                ->map(
                    fn (CircleNewJoy $circleNewJoy) => [
                        'slug'                    => $circleNewJoy->circle['slug'],
                        'name'                    => $circleNewJoy->circle['name'],
                        'short_name'              => $circleNewJoy->circle->circleInformation['short_name'],
                        'circle_type'             => $circleNewJoy->circle->circleInformation['circle_type'],
                        'main_image_url'          => $circleNewJoy->circle->circleInformation['main_image_url'],
                        'circleNewJoyValueObject' => CircleNewJoyValueObject::byEloquent($circleNewJoy)
                    ]
                )->toArray(),
            'futureCircleNewJoys' => $futureCircleNewJoys->sortBy('start_date')
                ->map(
                    fn (CircleNewJoy $circleNewJoy) => [
                        'slug'                    => $circleNewJoy->circle['slug'],
                        'name'                    => $circleNewJoy->circle['name'],
                        'short_name'              => $circleNewJoy->circle->circleInformation['short_name'],
                        'circle_type'             => $circleNewJoy->circle->circleInformation['circle_type'],
                        'main_image_url'          => $circleNewJoy->circle->circleInformation['main_image_url'],
                        'circleNewJoyValueObject' => circleNewJoyValueObject::byEloquent($circleNewJoy)
                    ]
                )->toArray(),
        ];
    }
}
