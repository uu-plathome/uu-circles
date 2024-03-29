<?php

declare(strict_types=1);

namespace App\UseCases\Main\UuYell;

use App\UseCases\Main\UuYell\Params\FetchUuYellArticlesForCirclesUsecaseParam;
use Illuminate\Support\Carbon;

final class FetchUuYellArticlesForCirclesKey
{
    const TTL = 60 * 60 * 3;

    public static function uuYellCacheKey(
        FetchUuYellArticlesForCirclesUsecaseParam $param
    ): string {
        $now = Carbon::now();
        $day = $now->format('Ymd');
        $hour = $now->hour - $now->hour % 2;

        return 'FetchUuYellArticlesForCirclesKey'.$param->name.$param->circle_url.$day.$hour;
    }
}
