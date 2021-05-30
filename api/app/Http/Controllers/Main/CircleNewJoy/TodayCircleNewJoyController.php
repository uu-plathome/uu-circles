<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Announcement\Dto\GetMainViewFixedAnnouncementsUsecaseDto;
use App\Usecases\Main\Announcement\GetMainViewFixedAnnouncementsUsecase;
use App\Usecases\Main\CircleNewJoy\GetTodayCircleNewJoyUsecase;
use App\Usecases\Main\UuYell\FetchUuYellArticlesKey;
use App\Usecases\Main\UuYell\FetchUuYellArticlesUsecase;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

final class TodayCircleNewJoyController extends Controller
{
    private FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase;
    private GetTodayCircleNewJoyUsecase $getTodayCircleNewJoyUsecase;
    private GetMainViewFixedAnnouncementsUsecase $getMainViewFixedAnnouncementsUsecase;

    public function __construct(
        FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase,
        GetMainViewFixedAnnouncementsUsecase $getMainViewFixedAnnouncementsUsecase,
        GetTodayCircleNewJoyUsecase $getTodayCircleNewJoyUsecase
    ) {
        $this->fetchUuYellArticlesUsecase = $fetchUuYellArticlesUsecase;
        $this->getMainViewFixedAnnouncementsUsecase = $getMainViewFixedAnnouncementsUsecase;
        $this->getTodayCircleNewJoyUsecase = $getTodayCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function __invoke(Request $request)
    {
        Log::debug("#TodayCircleNewJoyController args: none");

        $circleNewJoys = Cache::remember(
            $this->getCircleNewJoysCacheKey(),
            60,
            fn () => $this->getTodayCircleNewJoyUsecase->invoke()
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
            'todayCircleNewJoys'  => Arr::camel_keys(
                (new Collection($circleNewJoys['todayCircleNewJoys']))->map(
                    fn (array $arr) => [
                        'slug'           => $arr['slug'],
                        'name'           => $arr['name'],
                        'short_name'     => $arr['short_name'],
                        'circle_type'    => $arr['circle_type'],
                        'main_image_url' => $arr['main_image_url'],
                        'circleNewJoy'   => $arr['circleNewJoyValueObject']->toArray()
                    ]
                )->values()->toArray()
            ),
            'futureCircleNewJoys' => Arr::camel_keys(
                (new Collection($circleNewJoys['futureCircleNewJoys']))->map(
                    fn (array $arr) => [
                        'slug'           => $arr['slug'],
                        'name'           => $arr['name'],
                        'short_name'     => $arr['short_name'],
                        'circle_type'    => $arr['circle_type'],
                        'main_image_url' => $arr['main_image_url'],
                        'circleNewJoy'   => $arr['circleNewJoyValueObject']->toArray()
                    ]
                )->values()->toArray()
            ),
            'uuYellArticles' => $articles,
            'announcements'  => Arr::camel_keys($announcements->toArray())['announcements'],
        ];
    }

    private function getCircleNewJoysCacheKey(): string
    {
        $minutes = Carbon::now()->format('YmdHi');
        return 'TodayCircleNewJoyController.circleNewJoys' . $minutes;
    }
}
