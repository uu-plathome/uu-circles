<?php

declare(strict_types=1);

namespace App\Usecases\Main\Statistics;

use App\Enum\Property\CirclePageViewProperty;
use App\Models\CirclePageView;
use App\Support\Arr;
use App\Usecases\Main\Statistics\Dto\CircleForStatisticsDto;
use App\Usecases\Main\Statistics\Dto\StatisticsCirclePageViewsHighRankingDto;

final class StatisticsCirclePageViewsRankingUsecase
{
    /**
     * サークル閲覧数ランキング
     *
     * @return StatisticsCirclePageViewsHighRankingDto
     */
    public function invoke(): StatisticsCirclePageViewsHighRankingDto
    {
        $circlePageViews = CirclePageView::with([
            'circle',
            'circle.circleInformation',
            'circle.circleHandbill',
        ])
            ->hasByNonDependentSubquery('circle', function ($query) {
                $query->whereRelease(true);
            })
            ->hasByNonDependentSubquery('circle.circleInformation')
            ->select([
                CirclePageViewProperty::id,
                CirclePageViewProperty::circle_id,
                CirclePageViewProperty::page_views,
                CirclePageViewProperty::active_users,
            ])
            ->orderByDesc(CirclePageViewProperty::page_views)
            ->take(5)
            ->get();

        $circleValueObjects = $circlePageViews->map(
            fn (CirclePageView $circlePageView) => CircleForStatisticsDto::byEloquent(
                $circlePageView->circle,
                $circlePageView->circle->circleInformation,
                $circlePageView->circle->circleHandbill
            )
        )->all();

        $dto = new StatisticsCirclePageViewsHighRankingDto();
        $dto->first = Arr::get($circleValueObjects, 0);
        $dto->first_page_view = Arr::get($circlePageViews, 0);
        $dto->second = Arr::get($circleValueObjects, 1);
        $dto->second_page_view = Arr::get($circlePageViews, 1);
        $dto->third = Arr::get($circleValueObjects, 2);
        $dto->third_page_view = Arr::get($circlePageViews, 2);
        $dto->fourth = Arr::get($circleValueObjects, 3);
        $dto->fourth_page_view = Arr::get($circlePageViews, 3);
        $dto->fifth = Arr::get($circleValueObjects, 4);
        $dto->fifth_page_view = Arr::get($circlePageViews, 4);

        return $dto;
    }
}
