<?php

namespace App\Usecases\Main\Gacha;

use Illuminate\Support\Carbon;

class GachaPickupListKey
{
    public static function getPickupDate(): string
    {
        return Carbon::today()->format("Y-m-d");
    }

    /*
     * cacheのキーを作る
     */
    public static function getCacheKey(): string
    {
        return "GachaPickupListKey" . self::getPickupDate();
    }
}
