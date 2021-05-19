<?php

namespace App\Usecases\Main\Statistics\Dto;

/**
 * 週の活動頻度
 */
class StatisticsActivityFrequencyDto
{
    /**
     * 週に0回活動
     *
     * @var int
     */
    public int $zero;

    /**
     * 週に1回活動
     *
     * @var int
     */
    public int $one;

    /**
     * 週に2回活動
     *
     * @var int
     */
    public int $two;

    /**
     * 週に3回活動
     *
     * @var int
     */
    public int $three;

    /**
     * 週に4回活動
     *
     * @var int
     */
    public int $four;

    /**
     * 週に5活動
     *
     * @var int
     */
    public int $five;

    /**
     * 週に6回活動
     *
     * @var int
     */
    public int $six;

    /**
     * 週に7回活動
     *
     * @var int
     */
    public int $seven;

    public function toArray(): array
    {
        return [
            'zero'  => $this->zero,
            'one'   => $this->one,
            'two'   => $this->two,
            'three' => $this->three,
            'four'  => $this->four,
            'five'  => $this->five,
            'six'   => $this->six,
            'seven' => $this->seven,
        ];
    }
}
