<?php

declare(strict_types=1);

namespace App\Usecases\Main\Statistics\Dto;

/**
 * 活動費用ランキング (高い順)
 */
final class StatisticsActivityFrequencyRankingDto
{
    /**
     * 1位
     *
     * @var CircleForStatisticsDto|null
     */
    public ?CircleForStatisticsDto $first;

    /**
     * 2位
     *
     * @var CircleForStatisticsDto|null
     */
    public ?CircleForStatisticsDto $second;

    /**
     * 3位
     *
     * @var CircleForStatisticsDto|null
     */
    public ?CircleForStatisticsDto $third;

    /**
     * 4位
     *
     * @var CircleForStatisticsDto|null
     */
    public ?CircleForStatisticsDto $fourth;

    /**
     * 5位
     *
     * @var CircleForStatisticsDto|null
     */
    public ?CircleForStatisticsDto $fifth;

    public function toArray(): array
    {
        return [
            'first'  => $this->first ? $this->first->toArray() : null,
            'second' => $this->second ? $this->second->toArray() : null,
            'third'  => $this->third ? $this->third->toArray() : null,
            'fourth' => $this->fourth ? $this->fourth->toArray() : null,
            'fifth'  => $this->fifth ? $this->fifth->toArray() : null,
        ];
    }
}
