<?php

namespace App\Usecases\Main\Statistics;

use App\Dto\StatisticsActivityFrequencyDto;
use App\Dto\StatisticsDto;
use App\Dto\StatisticsOnlineActivityDto;
use App\Dto\StatisticsPlaceOfActivityFrequencyDto;
use App\Enum\PlaceOfActivity;
use App\Models\Circle;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class StatisticsUsecase
{
    public function invoke(): StatisticsDto
    {
        Log::debug("StatisticsUsecase args none");

        /** @var Collection $circles */
        $circles = Circle::with(['circleInformation'])
            ->whereRelease(true)
            ->hasByNonDependentSubquery('circleInformation')
            ->get();

        $statisticsDto = new StatisticsDto();
        // サークル数
        $statisticsDto->circleCount = $circles->count();
        // 活動費用の平均値
        $statisticsDto->averageActivityCost = round($circles->avg('circleInformation.admission_fee_per_year'));

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

        return $statisticsDto;
    }
}
