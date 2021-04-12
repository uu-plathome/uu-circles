<?php

namespace App\Dto;

/**
 * 活動場所
 */
class StatisticsPlaceOfActivityFrequencyDto
{
    /**
     * 峰キャンパス
     *
     * @var int
     */
    public int $mine;

    /**
     * 陽東キャンパス
     *
     * @var int
     */
    public int $yoto;

    /**
     * その他
     *
     * @var int
     */
    public int $other;

    public function toArray(): array
    {
        return [
            'mine'  => $this->mine,
            'yoto'  => $this->yoto,
            'other' => $this->other
        ];
    }
}
