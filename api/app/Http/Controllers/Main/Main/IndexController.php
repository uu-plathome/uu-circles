<?php

namespace App\Http\Controllers\Main\Main;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Advertise\GetMainTopAdvertiseUsecase;
use App\Usecases\Main\Advertise\GetRandomAdvertiseUsecase;
use App\Usecases\Main\Circle\GetRandomCircleWithMainFixedUsecase;
use App\Usecases\Main\UuYell\FetchUuYellArticlesKey;
use App\Usecases\Main\UuYell\FetchUuYellArticlesUsecase;
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
    private FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase;

    public function __construct(
        GetRandomAdvertiseUsecase $getRandomAdvertiseUsecase,
        GetMainTopAdvertiseUsecase $getMainTopAdvertiseUsecase,
        GetRandomCircleWithMainFixedUsecase $getRandomCircleWithMainFixedUsecase,
        FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase
    ) {
        $this->getRandomAdvertiseUsecase = $getRandomAdvertiseUsecase;
        $this->getMainTopAdvertiseUsecase = $getMainTopAdvertiseUsecase;
        $this->getRandomCircleWithMainFixedUsecase = $getRandomCircleWithMainFixedUsecase;
        $this->fetchUuYellArticlesUsecase = $fetchUuYellArticlesUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function __invoke(Request $request)
    {
        Log::debug("#IndexController args: none");

        $circles = Cache::remember(
            $this->getCacheKey(),
            60,
            fn () => $this->getRandomCircleWithMainFixedUsecase->invoke(12)
        );

        $advertises = Cache::remember($this->getAdvertiseCacheKey(), 60 * 5, function () {
            return $this->getRandomAdvertiseUsecase->invoke(2);
        });

        $mainAdvertises = Cache::remember(
            $this->getMainTopAdvertiseCacheKey(),
            60 * 30,
            fn () => $this->getMainTopAdvertiseUsecase->invoke()
        );

        $articles = Cache::remember(
            FetchUuYellArticlesKey::uuYellCacheKey(),
            FetchUuYellArticlesKey::TTL,
            fn () => $this->fetchUuYellArticlesUsecase->invoke()
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
            'uuYellArticles' => $articles,
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
