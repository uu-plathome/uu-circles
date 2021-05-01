<?php

namespace App\Usecases\Main\UuYell;

use Illuminate\Support\Carbon;

class FetchUuYellArticlesKey
{
    const TTL = 60 * 60 * 2;

    public static function uuYellCacheKey(): string
    {
        $now = Carbon::now();
        $day = $now->format('Ymd');
        $hour = $now->hour - $now->hour % 2;
        return 'FetchUuYellArticlesKey' . $day . $hour;
    }
}
