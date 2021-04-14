<?php

namespace App\Usecases\Main\UuYell;

use Illuminate\Support\Carbon;

class FetchUuYellArticlesKey
{
    public static function uuYellCacheKey(): string
    {
        $minutes = Carbon::now()->format('YmdH');
        return 'FetchUuYellArticlesKey' . $minutes;
    }
}
