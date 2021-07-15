<?php

declare(strict_types=1);

namespace App\Usecases\Main\Statistics;

use App\Enum\CircleType;
use App\Enum\PlaceOfActivity;
use App\Enum\Property\CircleNewJoyProperty;
use App\Enum\Property\PageViewProperty;
use App\Models\Circle;
use App\Models\CircleNewJoy;
use App\Models\PageView;
use App\Support\Arr;
use App\Usecases\Main\Statistics\Dto\CircleForStatisticsDto;
use App\Usecases\Main\Statistics\Dto\StatisticsActivityFrequencyDto;
use App\Usecases\Main\Statistics\Dto\StatisticsActivityFrequencyRankingDto;
use App\Usecases\Main\Statistics\Dto\StatisticsAdmissionFeePerYearHighRankingDto;
use App\Usecases\Main\Statistics\Dto\StatisticsAdmissionFeePerYearSmallRankingDto;
use App\Usecases\Main\Statistics\Dto\StatisticsCircleTypeDto;
use App\Usecases\Main\Statistics\Dto\StatisticsDto;
use App\Usecases\Main\Statistics\Dto\StatisticsNumberOfActivitiesCountDto;
use App\Usecases\Main\Statistics\Dto\StatisticsNumberOfActivitiesRankingDto;
use App\Usecases\Main\Statistics\Dto\StatisticsOnlineActivityDto;
use App\Usecases\Main\Statistics\Dto\StatisticsPlaceOfActivityFrequencyDto;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class StatisticsUsecase
{
    private StatisticsCirclePageViewsRankingUsecase $statisticsCirclePageViewsRankingUsecase;

    public function __construct(StatisticsCirclePageViewsRankingUsecase $statisticsCirclePageViewsRankingUsecase)
    {
        $this->statisticsCirclePageViewsRankingUsecase = $statisticsCirclePageViewsRankingUsecase;
    }

    public function invoke(): StatisticsDto
    {
        Log::debug('StatisticsUsecase args none');
        $now = Carbon::now();

        // サークル一覧
        /** @var Collection $circles */
        $circles = Circle::with([
            'circleInformation',
            'circleHandbill',
        ])
            ->whereRelease(true)
            ->whereIsOnlyDemo(false)
            ->hasByNonDependentSubquery('circleInformation')
            ->hasByNonDependentSubquery('circleHandbill')
            ->get();
        $circlesDto = $circles->map(
            fn (Circle $circle) => CircleForStatisticsDto::byEloquent(
                $circle,
                $circle->circleInformation,
                $circle->circleHandbill
            )
        );

        // 新歓一覧
        $circleNewJoys = CircleNewJoy::nowPublic($now)
            ->hasByNonDependentSubquery('circle', function ($query) {
                $query->whereRelease(true);
            })
            ->get();

        $statisticsDto = new StatisticsDto();
        // サークル数
        $statisticsDto->circleCount = $circles->count();
        // 活動費用の平均値
        $statisticsDto->averageActivityCost = (int) round($circles->avg('circleInformation.admission_fee_per_year'));

        // ページ数とユーザ数
        $pageViewsProperty = PageViewProperty::page_views;
        $activeUsersProperty = PageViewProperty::active_users;
        $pageView = PageView::select([
            DB::raw("SUM($pageViewsProperty) as $pageViewsProperty"),
            DB::raw("SUM($activeUsersProperty) as $activeUsersProperty"),
        ])->first()
            ->toArray();
        $statisticsDto->allPageViews = (int) Arr::get($pageView, $pageViewsProperty, 0);
        $statisticsDto->allActiveUsers = (int) Arr::get($pageView, $activeUsersProperty, 0);

        // 活動人数の幅
        $statisticsNumberOfActivitiesCountDto = new StatisticsNumberOfActivitiesCountDto();
        $statisticsNumberOfActivitiesCountDto->zeroToTen = $circles->filter(
            fn (Circle $circle) => $circle->circleInformation->number_of_members <= 10
        )->count();
        $statisticsNumberOfActivitiesCountDto->tenToTwenty = $circles->filter(
            fn (Circle $circle) => 11 <= $circle->circleInformation->number_of_members
                && $circle->circleInformation->number_of_members <= 20
        )->count();
        $statisticsNumberOfActivitiesCountDto->twentyToThirty = $circles->filter(
            fn (Circle $circle) => 21 <= $circle->circleInformation->number_of_members
                && $circle->circleInformation->number_of_members <= 30
        )->count();
        $statisticsNumberOfActivitiesCountDto->thirtyToForty = $circles->filter(
            fn (Circle $circle) => 31 <= $circle->circleInformation->number_of_members
                && $circle->circleInformation->number_of_members <= 40
        )->count();
        $statisticsNumberOfActivitiesCountDto->fortyToFifty = $circles->filter(
            fn (Circle $circle) => 41 <= $circle->circleInformation->number_of_members
                && $circle->circleInformation->number_of_members <= 50
        )->count();
        $statisticsNumberOfActivitiesCountDto->fiftyToSixty = $circles->filter(
            fn (Circle $circle) => 51 <= $circle->circleInformation->number_of_members
                && $circle->circleInformation->number_of_members <= 60
        )->count();
        $statisticsNumberOfActivitiesCountDto->sixtyToSeventy = $circles->filter(
            fn (Circle $circle) => 61 <= $circle->circleInformation->number_of_members
                && $circle->circleInformation->number_of_members <= 70
        )->count();
        $statisticsNumberOfActivitiesCountDto->seventyOrMore = $circles->filter(
            fn (Circle $circle) => 71 <= $circle->circleInformation->number_of_members
        )->count();
        $statisticsDto->statisticsNumberOfActivitiesCountDto = $statisticsNumberOfActivitiesCountDto;

        // 活動人数ランキング
        $statisticsNumberOfActivitiesRankingDto = new StatisticsNumberOfActivitiesRankingDto();
        $circleSortByNumberOfMembers = $circlesDto->filter(
            fn (CircleForStatisticsDto $cvo) => $cvo->number_of_members !== null
        )->sortByDesc(
            fn (CircleForStatisticsDto $cvo) => $cvo->number_of_members
        )->values();
        $statisticsNumberOfActivitiesRankingDto->first = Arr::get($circleSortByNumberOfMembers->all(), 0);
        $statisticsNumberOfActivitiesRankingDto->second = Arr::get($circleSortByNumberOfMembers->all(), 1);
        $statisticsNumberOfActivitiesRankingDto->third = Arr::get($circleSortByNumberOfMembers->all(), 2);
        $statisticsNumberOfActivitiesRankingDto->fourth = Arr::get($circleSortByNumberOfMembers->all(), 3);
        $statisticsNumberOfActivitiesRankingDto->fifth = Arr::get($circleSortByNumberOfMembers->all(), 4);
        $statisticsDto->statisticsNumberOfActivitiesRankingDto = $statisticsNumberOfActivitiesRankingDto;

        // 活動費用ランキング (高い順)
        $statisticsAdmissionFeePerYearHighRankingDto = new StatisticsAdmissionFeePerYearHighRankingDto();
        $circleSortByAdmissionFeePerYear = $circlesDto->filter(
            fn (CircleForStatisticsDto $cvo) => $cvo->admission_fee_per_year !== null
        )->sortByDesc(
            fn (CircleForStatisticsDto $cvo) => $cvo->admission_fee_per_year
        )->values()
            ->all();
        $statisticsAdmissionFeePerYearHighRankingDto->first = Arr::get($circleSortByAdmissionFeePerYear, 0);
        $statisticsAdmissionFeePerYearHighRankingDto->second = Arr::get($circleSortByAdmissionFeePerYear, 1);
        $statisticsAdmissionFeePerYearHighRankingDto->third = Arr::get($circleSortByAdmissionFeePerYear, 2);
        $statisticsAdmissionFeePerYearHighRankingDto->fourth = Arr::get($circleSortByAdmissionFeePerYear, 3);
        $statisticsAdmissionFeePerYearHighRankingDto->fifth = Arr::get($circleSortByAdmissionFeePerYear, 4);
        $statisticsDto->statisticsAdmissionFeePerYearHighRankingDto = $statisticsAdmissionFeePerYearHighRankingDto;

        // 活動費用ランキング (低い順)
        $statisticsAdmissionFeePerYearSmallRankingDto = new StatisticsAdmissionFeePerYearSmallRankingDto();
        $circleSortByAdmissionFeePerYear = $circlesDto->filter(
            fn (CircleForStatisticsDto $cvo) => $cvo->admission_fee_per_year !== null
        )->sortBy(
            fn (CircleForStatisticsDto $cvo) => $cvo->admission_fee_per_year
        )->values()
            ->all();
        $statisticsAdmissionFeePerYearSmallRankingDto->first = Arr::get($circleSortByAdmissionFeePerYear, 0);
        $statisticsAdmissionFeePerYearSmallRankingDto->second = Arr::get($circleSortByAdmissionFeePerYear, 1);
        $statisticsAdmissionFeePerYearSmallRankingDto->third = Arr::get($circleSortByAdmissionFeePerYear, 2);
        $statisticsAdmissionFeePerYearSmallRankingDto->fourth = Arr::get($circleSortByAdmissionFeePerYear, 3);
        $statisticsAdmissionFeePerYearSmallRankingDto->fifth = Arr::get($circleSortByAdmissionFeePerYear, 4);
        $statisticsDto->statisticsAdmissionFeePerYearSmallRankingDto = $statisticsAdmissionFeePerYearSmallRankingDto;

        // オンライン活動状況
        $statisticsOnlineActivityDto = new StatisticsOnlineActivityDto();
        $statisticsOnlineActivityDto->doOnlineCount = $circles->filter(
            fn (Circle $circle) => $circle->circleInformation->is_online_activity
        )->values()->count();
        $statisticsOnlineActivityDto->onlyOfflineCount = $circles->filter(
            fn (Circle $circle) => !$circle->circleInformation->is_online_activity
        )->values()->count();
        $statisticsDto->statisticsOnlineActivityDto = $statisticsOnlineActivityDto;

        // 週の活動頻度
        $statisticsActivityFrequencyDto = new StatisticsActivityFrequencyDto();
        $statisticsActivityFrequencyDto->zero = $circles->filter(
            fn (Circle $circle) => $circle->circleInformation->weeklyActivityDays() === 0
        )->values()->count();
        $statisticsActivityFrequencyDto->one = $circles->filter(
            fn (Circle $circle) => $circle->circleInformation->weeklyActivityDays() === 1
        )->values()->count();
        $statisticsActivityFrequencyDto->two = $circles->filter(
            fn (Circle $circle) => $circle->circleInformation->weeklyActivityDays() === 2
        )->values()->count();
        $statisticsActivityFrequencyDto->three = $circles->filter(
            fn (Circle $circle) => $circle->circleInformation->weeklyActivityDays() === 3
        )->values()->count();
        $statisticsActivityFrequencyDto->four = $circles->filter(
            fn (Circle $circle) => $circle->circleInformation->weeklyActivityDays() === 4
        )->values()->count();
        $statisticsActivityFrequencyDto->five = $circles->filter(
            fn (Circle $circle) => $circle->circleInformation->weeklyActivityDays() === 5
        )->values()->count();
        $statisticsActivityFrequencyDto->six = $circles->filter(
            fn (Circle $circle) => $circle->circleInformation->weeklyActivityDays() === 6
        )->values()->count();
        $statisticsActivityFrequencyDto->seven = $circles->filter(
            fn (Circle $circle) => $circle->circleInformation->weeklyActivityDays() === 7
        )->values()->count();
        $statisticsDto->statisticsActivityFrequencyDto = $statisticsActivityFrequencyDto;

        // 週の活動頻度ランキング (高い順)
        $statisticsActivityFrequencyRankingDto = new StatisticsActivityFrequencyRankingDto();
        $circleSortByActivityFrequency = $circlesDto->filter(
            fn (CircleForStatisticsDto $cvo) => $cvo->weekly_activity_days && $cvo->weekly_activity_days > 0
        )->sortByDesc(
            fn (CircleForStatisticsDto $cvo) => $cvo->weekly_activity_days
        )->values()
            ->all();
        $statisticsActivityFrequencyRankingDto->first = Arr::get($circleSortByActivityFrequency, 0);
        $statisticsActivityFrequencyRankingDto->second = Arr::get($circleSortByActivityFrequency, 1);
        $statisticsActivityFrequencyRankingDto->third = Arr::get($circleSortByActivityFrequency, 2);
        $statisticsActivityFrequencyRankingDto->fourth = Arr::get($circleSortByActivityFrequency, 3);
        $statisticsActivityFrequencyRankingDto->fifth = Arr::get($circleSortByActivityFrequency, 4);
        $statisticsDto->statisticsActivityFrequencyRankingDto = $statisticsActivityFrequencyRankingDto;

        // 活動場所
        $statisticsPlaceOfActivityFrequencyDto = new StatisticsPlaceOfActivityFrequencyDto();
        $statisticsPlaceOfActivityFrequencyDto->mine = $circles->filter(
            fn (Circle $circle) => $circle->circleInformation->common_place_of_activity === PlaceOfActivity::MINE
                || $circle->circleInformation->common_place_of_activity === PlaceOfActivity::MINE_AND_YOTO
        )->values()->count();
        $statisticsPlaceOfActivityFrequencyDto->yoto = $circles->filter(
            fn (Circle $circle) => $circle->circleInformation->common_place_of_activity === PlaceOfActivity::YOTO
                || $circle->circleInformation->common_place_of_activity === PlaceOfActivity::MINE_AND_YOTO
        )->values()->count();
        $statisticsPlaceOfActivityFrequencyDto->other = $circles->filter(
            fn (Circle $circle) => !$circle->circleInformation->common_place_of_activity === PlaceOfActivity::MINE
                && !$circle->circleInformation->common_place_of_activity === PlaceOfActivity::YOTO
                && !$circle->circleInformation->common_place_of_activity === PlaceOfActivity::MINE_AND_YOTO
        )->values()->count();
        $statisticsDto->statisticsPlaceOfActivityFrequencyDto = $statisticsPlaceOfActivityFrequencyDto;

        // サークル種別
        $statisticsCircleTypeDto = new StatisticsCircleTypeDto();
        $statisticsCircleTypeDto->officialOrganization = $circles->filter(
            fn (Circle $circle) => $circle->circleInformation->circle_type === CircleType::OFFICIAL_ORGANIZATION
        )->values()->count();
        $statisticsCircleTypeDto->unofficialOrganization = $circles->filter(
            fn (Circle $circle) => $circle->circleInformation->circle_type === CircleType::UNOFFICIAL_ORGANIZATION
        )->values()->count();
        $statisticsCircleTypeDto->sendingOrganization = $circles->filter(
            fn (Circle $circle) => $circle->circleInformation->circle_type === CircleType::SENDING_ORGANIZATION
        )->values()->count();
        $statisticsCircleTypeDto->studentGroup = $circles->filter(
            fn (Circle $circle) => $circle->circleInformation->circle_type === CircleType::STUDENT_GROUP
        )->values()->count();
        $statisticsDto->statisticsCircleTypeDto = $statisticsCircleTypeDto;

        // 新歓
        $newCircleNewJoysByStartDate = $circleNewJoys->map(
            fn (CircleNewJoy $circleNewJoy) => [
                CircleNewJoyProperty::start_date => $circleNewJoy->start_date->format('Y年m月d日'),
            ]
        )->groupBy(CircleNewJoyProperty::start_date)
            ->map(fn (Collection $c) => $c->count())
            ->sortKeys()
            ->all();
        $statisticsDto->circleNewJoyCount = $newCircleNewJoysByStartDate;

        // サークルページ閲覧数ランキング
        $statisticsDto->statisticsCirclePageViewsHighRankingDto =
            $this->statisticsCirclePageViewsRankingUsecase->invoke();

        return $statisticsDto;
    }
}
