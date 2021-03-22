<?php

namespace App\Http\Controllers\Main\Main;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Advertise\GetMainTopAdvertiseUsecase;
use App\Usecases\Main\Advertise\GetRandomAdvertiseUsecase;
use App\Usecases\Main\Circle\GetRandomCircleWithMainFixedUsecase;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class IndexController extends Controller
{
    private GetRandomAdvertiseUsecase $getRandomAdvertiseUsecase;
    private GetMainTopAdvertiseUsecase $getMainTopAdvertiseUsecase;
    private GetRandomCircleWithMainFixedUsecase $getRandomCircleWithMainFixedUsecase;

    public function __construct(
        GetRandomAdvertiseUsecase $getRandomAdvertiseUsecase,
        GetMainTopAdvertiseUsecase $getMainTopAdvertiseUsecase,
        GetRandomCircleWithMainFixedUsecase $getRandomCircleWithMainFixedUsecase
    ) {
        $this->getRandomAdvertiseUsecase = $getRandomAdvertiseUsecase;
        $this->getMainTopAdvertiseUsecase = $getMainTopAdvertiseUsecase;
        $this->getRandomCircleWithMainFixedUsecase = $getRandomCircleWithMainFixedUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        Log::debug("#IndexController args: none");

        $circles = Cache::remember(
            $this->getCacheKey(),
            60,
            fn () => $this->getRandomCircleWithMainFixedUsecase->invoke(12)
        );

        $advertises = Cache::remember($this->getAdvertiseCacheKey(), 60, function () {
            return $this->getRandomAdvertiseUsecase->invoke(2);
        });

        $mainAdvertises = Cache::remember(
            $this->getMainTopAdvertiseCacheKey(),
            60,
            fn () => $this->getMainTopAdvertiseUsecase->invoke()
        );

        return [
            'data' => Arr::camel_keys(
                (new Collection($circles))->map(
                    fn (CircleValueObject $circleValueObject) =>
                    Arr::only($circleValueObject->toArray(), [
                        'id', 'name', 'handbill_image_url', 'slug'
                    ])
                )->toArray()
            ),
            'mainAdvertises' => Arr::camel_keys($mainAdvertises),
            'advertises'     => Arr::camel_keys($advertises),
        ];
    }

    private function getCacheKey(): string
    {
        $minutes = Carbon::now()->format('YmdHi');
        return 'main' . $minutes . rand(0, 2);
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
