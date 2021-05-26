<?php

namespace App\Usecases\Main\Statistics\Dto;

/**
 * オンライン活動状況
 */
class StatisticsOnlineActivityDto
{
    /**
     * オンライン活動する
     *
     * @var int
     */
    public int $doOnlineCount;

    /**
     * オフライン活動のみ
     *
     * @var int
     */
    public int $onlyOfflineCount;

    public function toArray(): array
    {
        return [
            'do_online_count'   => $this->doOnlineCount,
            'only_online_count' => $this->onlyOfflineCount,
        ];
    }
}
