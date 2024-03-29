<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\Main;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\UseCases\Main\Advertise\GetMainTopAdvertiseUsecase;
use App\UseCases\Main\Advertise\GetRandomAdvertiseUsecase;
use App\UseCases\Main\Announcement\Dto\GetMainViewFixedAnnouncementsUsecaseDto;
use App\UseCases\Main\Announcement\GetMainViewFixedAnnouncementsUsecase;
use App\UseCases\Main\Circle\Dto\MainSimpleCircleListDto;
use App\UseCases\Main\Circle\GetRandomCircleWithMainFixedUsecase;
use App\UseCases\Main\UuYell\FetchUuYellArticlesKey;
use App\UseCases\Main\UuYell\FetchUuYellArticlesUsecase;
use Illuminate\Http\Request;
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

    public function __construct(
        private GetRandomAdvertiseUsecase $getRandomAdvertiseUsecase,
        private GetMainTopAdvertiseUsecase $getMainTopAdvertiseUsecase,
        private GetRandomCircleWithMainFixedUsecase $getRandomCircleWithMainFixedUsecase,
        private GetMainViewFixedAnnouncementsUsecase $getMainViewFixedAnnouncementsUsecase,
        private FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase
    ) {
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

        /** @var \App\UseCases\Main\Circle\Dto\MainSimpleCircleListDto $circles */
        $circles = Cache::remember(
            GetRandomCircleWithMainFixedUsecase::getCacheKey(),
            GetRandomCircleWithMainFixedUsecase::TTL,
            fn () => $this->getRandomCircleWithMainFixedUsecase->invoke(self::CIRCLE_MAX_VIEW)
        );

        $advertises = Cache::remember(
            GetRandomAdvertiseUsecase::getCacheKey(),
            GetRandomAdvertiseUsecase::TTL,
            fn () => $this->getRandomAdvertiseUsecase->invoke(self::ADVERTISE_MAX_VIEW)
        );

        $mainAdvertises = Cache::remember(
            GetMainTopAdvertiseUsecase::getCacheKey(),
            GetMainTopAdvertiseUsecase::TTL,
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
}
