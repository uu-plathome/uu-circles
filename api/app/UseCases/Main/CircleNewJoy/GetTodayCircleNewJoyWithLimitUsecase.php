<?php

declare(strict_types=1);

namespace App\UseCases\Main\CircleNewJoy;

use App\Enum\Property\CircleNewJoyProperty;
use App\Models\CircleNewJoy;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

final class GetTodayCircleNewJoyWithLimitUsecase
{
    /**
     * 今日の新歓
     * 今日〜未来にかけて、最大$limit件取得する.
     *
     * @return void
     */
    public function invoke(int $limit = 6)
    {
        Log::debug('#GetTodayCircleNewJoyWithLimitUsecase args', [
            'limit' => $limit,
        ]);

        $now = Carbon::now();
        $today = Carbon::today();

        $todayCircleNewJoy = CircleNewJoy::with([
            'circle:id,slug,release,name',
            'circle.circleInformation:circle_id,circle_type,main_image_url',
        ])
            ->nowPublic($now)
            ->hasByNonDependentSubquery('circle', function ($query) {
                // 公開中のサークルのみ
                /** @var \App\Models\Circle $query */
                $query->whereRelease(true);
            })
            ->whereDate(CircleNewJoyProperty::start_date, '>=', $today)
            ->orderByDesc(CircleNewJoyProperty::start_date)
            ->take($limit)
            ->get();

        return [
            'todayCircleNewJoys' => $todayCircleNewJoy->sortBy('start_date')
                ->map(
                    fn (CircleNewJoy $circleNewJoy) => [
                        'slug'                    => $circleNewJoy->circle['slug'],
                        'name'                    => $circleNewJoy->circle['name'],
                        'circle_type'             => $circleNewJoy->circle->circleInformation['circle_type'],
                        'main_image_url'          => $circleNewJoy->circle->circleInformation['main_image_url'],
                        'circleNewJoyValueObject' => CircleNewJoyValueObject::byEloquent($circleNewJoy),
                    ]
                )->toArray(),
        ];
    }
}
