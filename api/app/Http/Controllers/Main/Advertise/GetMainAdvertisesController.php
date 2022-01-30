<?php

namespace App\Http\Controllers\Main\Advertise;

use App\Support\Arr;
use App\UseCases\Main\Advertise\GetMainTopAdvertiseUsecase;
use App\UseCases\Main\Advertise\GetRandomAdvertiseUsecase;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class GetMainAdvertisesController
{
    /**
     * 広告の取得数.
     */
    const ADVERTISE_MAX_VIEW = 2;

    public function __construct(
        private GetRandomAdvertiseUsecase $getRandomAdvertiseUsecase,
        private GetMainTopAdvertiseUsecase $getMainTopAdvertiseUsecase,
    ) {
    }

    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function __invoke(Request $request): array
    {
        Log::debug('GetFixedTopAdvertisesController args: none');

        // 広告
        $advertises = Cache::remember(
            $this->getAdvertiseCacheKey(),
            60 * 5,
            fn () => $this->getRandomAdvertiseUsecase->invoke(self::ADVERTISE_MAX_VIEW)
        );

        // トップ画面に固定する広告
        $mainAdvertises = Cache::remember(
            $this->getMainTopAdvertiseCacheKey(),
            60 * 30,
            fn () => $this->getMainTopAdvertiseUsecase->invoke()
        );

        return [
            'advertises'     => Arr::camel_keys($advertises),
            'mainAdvertises' => Arr::camel_keys($mainAdvertises),
        ];
    }

    private function getMainTopAdvertiseCacheKey(): string
    {
        $hour = Carbon::now()->format('YmdH');

        return 'main.advertise.mainTop' . $hour;
    }

    private function getAdvertiseCacheKey(): string
    {
        $minutes = Carbon::now()->format('YmdHi');

        return 'main.advertise' . $minutes;
    }
}
