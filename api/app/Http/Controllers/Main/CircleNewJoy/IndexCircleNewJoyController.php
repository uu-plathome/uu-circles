<?php

namespace App\Http\Controllers\Main\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Announcement\Dto\GetMainViewFixedAnnouncementsUsecaseDto;
use App\Usecases\Main\Announcement\GetMainViewFixedAnnouncementsUsecase;
use App\Usecases\Main\Circle\GetCircleBySlugUsecase;
use App\Usecases\Main\CircleNewJoy\GetTodayCircleNewJoyWithLimitUsecase;
use App\Usecases\Main\CircleNewJoy\IndexCircleNewJoyUsecase;
use App\Usecases\Main\UuYell\FetchUuYellArticlesKey;
use App\Usecases\Main\UuYell\FetchUuYellArticlesUsecase;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class IndexCircleNewJoyController extends Controller
{
    private FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase;
    private GetCircleBySlugUsecase $getCircleBySlugUsecase;
    private GetTodayCircleNewJoyWithLimitUsecase $getTodayCircleNewJoyWithLimitUsecase;
    private GetMainViewFixedAnnouncementsUsecase $getMainViewFixedAnnouncementsUsecase;
    private IndexCircleNewJoyUsecase $indexCircleNewJoyUsecase;

    public function __construct(
        FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase,
        GetCircleBySlugUsecase $getCircleBySlugUsecase,
        GetTodayCircleNewJoyWithLimitUsecase $getTodayCircleNewJoyWithLimitUsecase,
        GetMainViewFixedAnnouncementsUsecase $getMainViewFixedAnnouncementsUsecase,
        IndexCircleNewJoyUsecase $indexCircleNewJoyUsecase
    ) {
        $this->fetchUuYellArticlesUsecase = $fetchUuYellArticlesUsecase;
        $this->getCircleBySlugUsecase = $getCircleBySlugUsecase;
        $this->getTodayCircleNewJoyWithLimitUsecase = $getTodayCircleNewJoyWithLimitUsecase;
        $this->getMainViewFixedAnnouncementsUsecase = $getMainViewFixedAnnouncementsUsecase;
        $this->indexCircleNewJoyUsecase = $indexCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param string $slug
     * @return array
     */
    public function __invoke(Request $request, string $slug)
    {
        Log::debug("#IndexCircleNewJoyController args", [
            'slug' => $slug
        ]);

        $circle = $this->getCircleBySlugUsecase->invoke($slug);

        $circleNewJoys = Cache::remember(
            $this->getCircleNewJoysCacheKey(),
            60,
            fn () => $this->indexCircleNewJoyUsecase->invoke($circle->circleValueObject->id)
        );

        $allCircleNewJoys = Cache::remember(
            $this->getAllCircleNewJoysCacheKey(),
            60,
            fn () => $this->getTodayCircleNewJoyWithLimitUsecase->invoke()
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
            'circle'              => Arr::camel_keys($circle->circleValueObject->toArray()),
            // 新歓開催済み
            'pastCircleNewJoys'   => Arr::camel_keys(
                (new Collection($circleNewJoys['pastCircleNewJoys']))->map(
                    fn (CircleNewJoyValueObject $circleNewJoyValueObject) => $circleNewJoyValueObject->toArray()
                )->values()->toArray()
            ),
            // 新歓開催前
            'futureCircleNewJoys' => Arr::camel_keys(
                (new Collection($circleNewJoys['futureCircleNewJoys']))->map(
                    fn (CircleNewJoyValueObject $circleNewJoyValueObject) => $circleNewJoyValueObject->toArray()
                )->values()->toArray()
            ),
            // 現在開催中
            'nowCircleNewJoys'    => Arr::camel_keys(
                (new Collection($circleNewJoys['nowCircleNewJoys']))->map(
                    fn (CircleNewJoyValueObject $circleNewJoyValueObject) => $circleNewJoyValueObject->toArray()
                )->values()->toArray()
            ),
            // 今日の新歓
            'todayCircleNewJoys'  => Arr::camel_keys(
                (new Collection($circleNewJoys['todayCircleNewJoys']))->map(
                    fn (CircleNewJoyValueObject $circleNewJoyValueObject) => $circleNewJoyValueObject->toArray()
                )->values()->toArray()
            ),
            // 今日の新歓 全て
            'allTodayCircleNewJoys' => Arr::camel_keys(
                (new Collection($allCircleNewJoys['todayCircleNewJoys']))->map(
                    fn (array $arr) => [
                        'slug'           => $arr['slug'],
                        'name'           => $arr['name'],
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
        return 'IndexCircleNewJoyController.circleNewJoys' . $minutes;
    }

    private function getAllCircleNewJoysCacheKey(): string
    {
        $minutes = Carbon::now()->format('YmdHi');
        return 'IndexCircleNewJoyController.allCircleNewJoys' . $minutes;
    }
}
