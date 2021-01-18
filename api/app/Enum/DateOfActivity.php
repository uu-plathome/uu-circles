<?php

namespace App\Enum;

/**
 * 活動日時
 */
class DateOfActivity
{
    /**
     * 毎週
     */
    const EVERY_WEEK = 'EVERY_WEEK';

    /**
     * 隔週
     */
    const EVERY_OTHER_WEEK = 'EVERY_OTHER_WEEK';

    public static function getAll(): array
    {
        return [
            self::EVERY_WEEK,
            self::EVERY_OTHER_WEEK,
        ];
    }
}
