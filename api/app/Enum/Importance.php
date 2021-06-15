<?php

namespace App\Enum;

/**
 * 重要度.
 */
class Importance
{
    /**
     * 高.
     */
    const HIGH = 'HIGH';

    /**
     * 中.
     */
    const MIDDLE = 'MIDDLE';

    /**
     * 低.
     */
    const LOW = 'LOW';

    public static function getAll(): array
    {
        return [
            self::HIGH,
            self::MIDDLE,
            self::LOW,
        ];
    }
}
