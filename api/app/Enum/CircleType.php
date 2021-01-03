<?php

namespace App\Enum;

/**
 * サークル種類
 */
class CircleType
{
    /**
     * 公式団体
     */
    const OFFICIAL_ORGANIZATION = 'OFFICIAL_ORGANIZATION';

    /**
     * 非公式団体
     */
    const UNOFFICIAL_ORGANIZATION = 'OFFICIAL_ORGANIZATION';

    /**
     * 届出団体
     */
    const SENDING_ORGANIZATION = 'SENDING_ORGANIZATION';

    /**
     * 学生団体
     */
    const STUDENT_GROUP = 'STUDENT_GROUP';

    public static function getAll(): array
    {
        return [
            self::OFFICIAL_ORGANIZATION,
            self::UNOFFICIAL_ORGANIZATION,
            self::SENDING_ORGANIZATION,
            self::STUDENT_GROUP,
        ];
    }
}
