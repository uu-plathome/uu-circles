<?php

declare(strict_types=1);

namespace App\Usecases\Main\Statistics\Dto;

/**
 * 統計情報
 */
final class StatisticsDto
{
    /**
     * サークル数
     *
     * @var int
     */
    public int $circleCount;

    /**
     * ページ数
     *
     * @var int
     */
    public int $allPageViews;

    /**
     * ユーザー数
     *
     * @var int
     */
    public int $allActiveUsers;

    /**
     * 活動費用の平均値
     *
     * @var int
     */
    public int $averageActivityCost;

    /**
     * 日々の新歓数
     *
     * @var array
     *
     * [
     *   '2021年4月1日' => int,
     *   '2021年4月3日' => int,
     *   '2021年4月5日' => int,
     * ]
     */
    public array $circleNewJoyCount;

    /**
     * 活動人数の幅
     *
     * @var StatisticsNumberOfActivitiesCountDto
     */
    public StatisticsNumberOfActivitiesCountDto $statisticsNumberOfActivitiesCountDto;

    /**
     * 活動人数ランキング
     *
     * @var StatisticsNumberOfActivitiesRankingDto
     */
    public StatisticsNumberOfActivitiesRankingDto $statisticsNumberOfActivitiesRankingDto;

    /**
     * 活動費用ランキング (高い順)
     *
     * @var StatisticsAdmissionFeePerYearHighRankingDto
     */
    public StatisticsAdmissionFeePerYearHighRankingDto $statisticsAdmissionFeePerYearHighRankingDto;

    /**
     * 活動費用ランキング (低い順)
     *
     * @var StatisticsAdmissionFeePerYearSmallRankingDto
     */
    public StatisticsAdmissionFeePerYearSmallRankingDto $statisticsAdmissionFeePerYearSmallRankingDto;

    /**
     * 週の活動頻度
     *
     * @var StatisticsActivityFrequencyDto
     */
    public StatisticsActivityFrequencyDto $statisticsActivityFrequencyDto;

    /**
     * 週の活動頻度ランキング (高い順)
     *
     * @var StatisticsActivityFrequencyRankingDto
     */
    public StatisticsActivityFrequencyRankingDto $statisticsActivityFrequencyRankingDto;

    /**
     * オンライン活動状況
     *
     * @var StatisticsOnlineActivityDto
     */
    public StatisticsOnlineActivityDto $statisticsOnlineActivityDto;

    /**
     * 活動場所
     *
     * @var StatisticsPlaceOfActivityFrequencyDto
     */
    public StatisticsPlaceOfActivityFrequencyDto $statisticsPlaceOfActivityFrequencyDto;

    /**
     * サークル種別
     *
     * @var StatisticsCircleTypeDto
     */
    public StatisticsCircleTypeDto $statisticsCircleTypeDto;

    /**
     * サークルページ閲覧数ランキング
     *
     * @var StatisticsCirclePageViewsHighRankingDto
     */
    public StatisticsCirclePageViewsHighRankingDto $statisticsCirclePageViewsHighRankingDto;

    public function toArray(): array
    {
        return [
            // サークル数
            'circle_count'                 => $this->circleCount,
            // ページ数
            'all_page_views'               => $this->allPageViews,
            // ユーザ数
            'all_active_users'             => $this->allActiveUsers,
            // 活動費用の平均値
            'average_activity_cost'        => $this->averageActivityCost,
            // 日々の新歓数
            'circle_new_joy_count'         => $this->circleNewJoyCount,
            // 活動人数の幅
            'number_of_activities_count'            => $this->statisticsNumberOfActivitiesCountDto->toArray(),
            // 活動人数ランキング
            'number_of_activities_ranking'          => $this->statisticsNumberOfActivitiesRankingDto->toArray(),
            // 活動費用ランキング (高い順)
            'admission_fee_per_year_high_rankings'  => $this->statisticsAdmissionFeePerYearHighRankingDto->toArray(),
            // 活動費用ランキング (低い順)
            'admission_fee_per_year_small_rankings' => $this->statisticsAdmissionFeePerYearSmallRankingDto->toArray(),
            // 週の活動頻度
            'activity_frequency'                    => $this->statisticsActivityFrequencyDto->toArray(),
            // 週の活動頻度 (高い順)
            'activity_frequency_ranking_dto'        => $this->statisticsActivityFrequencyRankingDto->toArray(),
            // オンライン活動状況
            'online_activity_activity'              => $this->statisticsOnlineActivityDto->toArray(),
            // 活動場所
            'place_of_activity_frequency'           => $this->statisticsPlaceOfActivityFrequencyDto->toArray(),
            // サークル種別
            'circle_type'                           => $this->statisticsCircleTypeDto->toArray(),
            // サークルページ閲覧数ランキング
            'circle_page_views_high_ranking'        => $this->statisticsCirclePageViewsHighRankingDto->toArray(),
        ];
    }
}
