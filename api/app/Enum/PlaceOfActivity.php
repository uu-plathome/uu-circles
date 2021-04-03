<?php

namespace App\Enum;

/**
 * 活動場所
 */
class PlaceOfActivity
{
    /**
     * 峰キャンパス
     */
    const MINE = 'MINE';

    /**
     * 陽東キャンパス
     */
    const YOTO = 'YOTO';

    /**
     * 峰キャンパス, 陽東キャンパス
     */
    const MINE_AND_YOTO = 'MINE_AND_YOTO';

    /**
     * 新歓Discord
     */
    const NEWJOY_DISCORD = 'NEWJOY_DISCORD';

    /**
     * Zoom
     */
    const ZOOM = 'ZOOM';

    /**
     * Discord
     */
    const DISCORD = 'DISCORD';

    /**
     * その他
     */
    const OTHER = 'OTHER';

    /**
     * 新歓の活動場所
     *
     * @return PlaceOfActivity[]
     */
    public static function toArrayForCircleNewJoy(): array
    {
        return [
            PlaceOfActivity::MINE,
            PlaceOfActivity::YOTO,
            PlaceOfActivity::NEWJOY_DISCORD,
            PlaceOfActivity::DISCORD,
            PlaceOfActivity::ZOOM,
            PlaceOfActivity::OTHER
        ];
    }
}
