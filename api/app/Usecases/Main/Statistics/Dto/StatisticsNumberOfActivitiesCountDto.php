<?php

declare(strict_types=1);

namespace App\Usecases\Main\Statistics\Dto;

final class StatisticsNumberOfActivitiesCountDto
{
    /**
     * 0 ~ 10人
     *
     * @var int
     */
    public int $zeroToTen;

    /**
     * 11 ~ 20人
     *
     * @var int
     */
    public int $tenToTwenty;

    /**
     * 21 ~ 30人
     *
     * @var int
     */
    public int $twentyToThirty;

    /**
     * 31 ~ 40人
     *
     * @var int
     */
    public int $thirtyToForty;

    /**
     * 41 ~ 50人
     *
     * @var int
     */
    public int $fortyToFifty;

    /**
     * 51 ~ 60人
     *
     * @var int
     */
    public int $fiftyToSixty;

    /**
     * 61 ~ 70人
     *
     * @var int
     */
    public int $sixtyToSeventy;

    /**
     * 71人以上
     *
     * @var int
     */
    public int $seventyOrMore;

    public function toArray(): array
    {
        return [
            /** 0 ~ 10人 */
            'zero_to_ten'      => $this->zeroToTen,
            /** 11 ~ 20人 */
            'ten_to_twenty'    => $this->tenToTwenty,
            /** 21 ~ 30人 */
            'twenty_to_thirty' => $this->twentyToThirty,
            /** 31 ~ 40人 */
            'thirty_to_forty'  => $this->thirtyToForty,
            /** 41 ~ 50人 */
            'forty_to_fifty'   => $this->fortyToFifty,
            /** 51 ~ 60人 */
            'fifty_to_sixty'   => $this->fiftyToSixty,
            /** 61 ~ 70人 */
            'sixty_to_seventy' => $this->sixtyToSeventy,
            /** 71人以上 */
            'seventy_or_more'  => $this->seventyOrMore,
        ];
    }
}
