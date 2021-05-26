<?php

namespace App\Usecases\Main\Statistics\Dto;

use App\ValueObjects\CircleValueObject;

/**
 * 活動費用ランキング (高い順)
 */
class StatisticsActivityFrequencyRankingDto
{
    /**
     * 1位
     *
     * @var CircleValueObject|null
     */
    public ?CircleValueObject $first;

    /**
     * 2位
     *
     * @var CircleValueObject|null
     */
    public ?CircleValueObject $second;

    /**
     * 3位
     *
     * @var CircleValueObject|null
     */
    public ?CircleValueObject $third;

    /**
     * 4位
     *
     * @var CircleValueObject|null
     */
    public ?CircleValueObject $fourth;

    /**
     * 5位
     *
     * @var CircleValueObject|null
     */
    public ?CircleValueObject $fifth;

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
