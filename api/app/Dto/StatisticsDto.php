<?php

namespace App\Dto;

/**
 * 統計情報
 */
class StatisticsDto
{
    /**
     * サークル数
     *
     * @var int
     */
    public int $circleCount;

    /**
     * 活動費用の平均値
     *
     * @var int
     */
    public int $averageActivityCost;

    /**
     * 週の活動頻度
     *
     * @var StatisticsActivityFrequencyDto
     */
    public StatisticsActivityFrequencyDto $statisticsActivityFrequencyDto;

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

    public function toArray(): array
    {
        return [
            // サークル数
            'circle_count'                => $this->circleCount,
            // 活動費用の平均値
            'average_activity_cost'       => $this->averageActivityCost,
            // 週の活動頻度
            'activity_frequency'          => $this->statisticsActivityFrequencyDto->toArray(),
            // オンライン活動状況
            'online_activity_activity'    => $this->statisticsOnlineActivityDto->toArray(),
            // 活動場所
            'place_of_activity_frequency' => $this->statisticsPlaceOfActivityFrequencyDto->toArray(),
        ];
    }
}
