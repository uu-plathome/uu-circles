<?php

declare(strict_types=1);

namespace App\UseCases\Main\Statistics\Dto;

/**
 * オンライン活動状況
 */
final class StatisticsOnlineActivityDto
{
    /**
     * オンライン活動する.
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
