<?php

declare(strict_types=1);

namespace App\UseCases\Main\Gacha;

use Illuminate\Support\Carbon;

final class GachaPickupListKey
{
    public static function getPickupDate(): string
    {
        return Carbon::today()->format('Y-m-d');
    }

    /*
     * cacheのキーを作る
     */
    public static function getCacheKey(): string
    {
        return 'Usecase.Main.GachaPickupListKey　'.self::getPickupDate();
    }
}
