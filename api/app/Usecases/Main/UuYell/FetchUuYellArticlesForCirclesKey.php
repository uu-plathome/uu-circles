<?php

namespace App\Usecases\Main\UuYell;

use App\Usecases\Main\UuYell\Params\FetchUuYellArticlesForCirclesUsecaseParam;
use Illuminate\Support\Carbon;

class FetchUuYellArticlesForCirclesKey
{
    public static function uuYellCacheKey(
        FetchUuYellArticlesForCirclesUsecaseParam $param
    ): string {
        $minutes = Carbon::now()->format('YmdH');
        return 'FetchUuYellArticlesForCirclesKey' . $param->name . $param->circle_url . $minutes;
    }
}
