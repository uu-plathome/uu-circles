<?php

namespace App\Http\Controllers\Main\Statistics;

use App\Support\Arr;
use App\Usecases\Main\Statistics\StatisticsUsecase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class StatisticsController
{
    private StatisticsUsecase $statisticsUsecase;

    public function __construct(StatisticsUsecase $statisticsUsecase)
    {
        $this->statisticsUsecase = $statisticsUsecase;
    }

    /**
     * 統計情報
     *
     * @return array
     */
    public function __invoke()
    {
        Log::debug("StatisticsController args none");

        // 統計情報
        $statistics = $this->statisticsUsecase->invoke();
//        Cache::remember(
//            'StatisticsController.statistics',
//            60 * 60,
//            fn () =>
//        );

        return Arr::camel_keys([
            'statistics' => $statistics->toArray(),
        ]);
    }
}
