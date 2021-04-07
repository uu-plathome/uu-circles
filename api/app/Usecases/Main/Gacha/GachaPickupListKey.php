<?php


namespace App\Usecases\Main\Gacha;


use Illuminate\Support\Carbon;

class GachaPickupListKey
{
    public static function getPickupDate(): string
    {
        return Carbon::today()->format("YYYY-MM-DD");
    }
}
