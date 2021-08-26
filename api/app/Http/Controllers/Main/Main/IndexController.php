<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\Main;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Advertise\GetMainTopAdvertiseUsecase;
use App\Usecases\Main\Advertise\GetRandomAdvertiseUsecase;
use App\Usecases\Main\Announcement\Dto\GetMainViewFixedAnnouncementsUsecaseDto;
use App\Usecases\Main\Announcement\GetMainViewFixedAnnouncementsUsecase;
use App\Usecases\Main\Circle\Dto\MainSimpleCircleListDto;
use App\Usecases\Main\Circle\GetRandomCircleWithMainFixedUsecase;
use App\Usecases\Main\UuYell\FetchUuYellArticlesKey;
use App\Usecases\Main\UuYell\FetchUuYellArticlesUsecase;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

final class IndexController extends Controller
{
    /**
     * サークルの取得数.
     */
    const CIRCLE_MAX_VIEW = 12;

    /**
     * 広告の取得数.
     */
    const ADVERTISE_MAX_VIEW = 2;

    private GetRandomAdvertiseUsecase $getRandomAdvertiseUsecase;
    private GetMainTopAdvertiseUsecase $getMainTopAdvertiseUsecase;
    private GetRandomCircleWithMainFixedUsecase $getRandomCircleWithMainFixedUsecase;
    private GetMainViewFixedAnnouncementsUsecase $getMainViewFixedAnnouncementsUsecase;
    private FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase;

    public function __construct(
        GetRandomAdvertiseUsecase $getRandomAdvertiseUsecase,
        GetMainTopAdvertiseUsecase $getMainTopAdvertiseUsecase,
        GetRandomCircleWithMainFixedUsecase $getRandomCircleWithMainFixedUsecase,
        GetMainViewFixedAnnouncementsUsecase $getMainViewFixedAnnouncementsUsecase,
        FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase
    ) {
        $this->getRandomAdvertiseUsecase = $getRandomAdvertiseUsecase;
        $this->getMainTopAdvertiseUsecase = $getMainTopAdvertiseUsecase;
        $this->getRandomCircleWithMainFixedUsecase = $getRandomCircleWithMainFixedUsecase;
        $this->getMainViewFixedAnnouncementsUsecase = $getMainViewFixedAnnouncementsUsecase;
        $this->fetchUuYellArticlesUsecase = $fetchUuYellArticlesUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function __invoke(Request $request)
    {
        Log::debug('#IndexController args: none');

        /** @var \App\Usecases\Main\Circle\Dto\MainSimpleCircleListDto $circles */
        $circles = Cache::remember(
            $this->getCacheKey(),
            60 * 3,
            fn () => $this->getRandomCircleWithMainFixedUsecase->invoke(self::CIRCLE_MAX_VIEW)
        );

        $advertises = Cache::remember($this->getAdvertiseCacheKey(), 60 * 5, function () {
            return $this->getRandomAdvertiseUsecase->invoke(self::ADVERTISE_MAX_VIEW);
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

        // メイン画面に固定するお知らせの取得
        /** @var GetMainViewFixedAnnouncementsUsecaseDto $announcements */
        $announcements = Cache::remember(
            GetMainViewFixedAnnouncementsUsecase::getCacheKey(),
            GetMainViewFixedAnnouncementsUsecase::TTL,
            fn () => $this->getMainViewFixedAnnouncementsUsecase->invoke()
        );

        return [
            'data'           => Arr::camel_keys(
                Arr::get($circles->toArray(), MainSimpleCircleListDto::LIST)
            ),
            'mainAdvertises' => Arr::camel_keys($mainAdvertises),
            'advertises'     => Arr::camel_keys($advertises),
            'uuYellArticles' => $articles,
            'announcements'  => Arr::camel_keys($announcements->toArray())['announcements'],
        ];
    }

    private function getCacheKey(): string
    {
        $now = Carbon::now();
        $hours = $now->format('YmdHi');
        $minutes_flag = $now->minute % 3;

        return 'main'.$hours.$minutes_flag;
    }

    private function getMainTopAdvertiseCacheKey(): string
    {
        $hour = Carbon::now()->format('YmdH');

        return 'main.advertise.mainTop'.$hour;
    }

    private function getAdvertiseCacheKey(): string
    {
        $minutes = Carbon::now()->format('YmdHi');

        return 'main.advertise'.$minutes;
    }
}
