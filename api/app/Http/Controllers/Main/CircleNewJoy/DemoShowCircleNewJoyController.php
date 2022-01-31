<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\UseCases\Main\Announcement\Dto\GetMainViewFixedAnnouncementsUsecaseDto;
use App\UseCases\Main\Announcement\GetMainViewFixedAnnouncementsUsecase;
use App\UseCases\Main\Circle\GetCircleBySlugUsecase;
use App\UseCases\Main\CircleNewJoy\GetTodayCircleNewJoyWithLimitUsecase;
use App\UseCases\Main\DemoCircleNewJoy\Dto\DemoCircleNewJoyDto;
use App\UseCases\Main\DemoCircleNewJoy\IndexDemoCircleNewJoyUsecase;
use App\UseCases\Main\UuYell\FetchUuYellArticlesKey;
use App\UseCases\Main\UuYell\FetchUuYellArticlesUsecase;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

final class DemoShowCircleNewJoyController extends Controller
{
    public function __construct(
        private FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase,
        private GetCircleBySlugUsecase $getCircleBySlugUsecase,
        private GetTodayCircleNewJoyWithLimitUsecase $getTodayCircleNewJoyWithLimitUsecase,
        private GetMainViewFixedAnnouncementsUsecase $getMainViewFixedAnnouncementsUsecase,
        private IndexDemoCircleNewJoyUsecase $indexDemoCircleNewJoyUsecase
    ) {
    }

    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param string                   $slug
     * @param int                      $demoCircleNewJoyId
     *
     * @return array
     */
    public function __invoke(Request $request, string $slug, int $demoCircleNewJoyId)
    {
        Log::debug('DemoShowCircleNewJoyController args', [
            'slug'               => $slug,
            'demoCircleNewJoyId' => $demoCircleNewJoyId,
        ]);

        $circle = $this->getCircleBySlugUsecase->invoke($slug);

        $circleNewJoys = Cache::remember(
            $this->getCircleNewJoysCacheKey($slug, $demoCircleNewJoyId),
            60,
            fn () => $this->indexDemoCircleNewJoyUsecase->invoke($circle->circleValueObject->id, $demoCircleNewJoyId)
        );
        if (!$circleNewJoys || !$circleNewJoys['circleNewJoy']) {
            throw new ModelNotFoundException();
        }

        $allCircleNewJoys = Cache::remember(
            $this->getAllCircleNewJoysCacheKey($slug, $demoCircleNewJoyId),
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
            'circle'       => Arr::camel_keys($circle->circleValueObject->toArray()),
            'circleNewJoy' => Arr::camel_keys($circleNewJoys['circleNewJoy']->toArray()),
            // 新歓開催済み
            'pastCircleNewJoys'   => Arr::camel_keys(
                (new Collection($circleNewJoys['pastCircleNewJoys']))->map(
                    fn (DemoCircleNewJoyDto $dto) => $dto->toArray()
                )->values()->toArray()
            ),
            // 新歓開催前
            'futureCircleNewJoys' => Arr::camel_keys(
                (new Collection($circleNewJoys['futureCircleNewJoys']))->map(
                    fn (DemoCircleNewJoyDto $dto) => $dto->toArray()
                )->values()->toArray()
            ),
            // 現在開催中
            'nowCircleNewJoys'    => Arr::camel_keys(
                (new Collection($circleNewJoys['nowCircleNewJoys']))->map(
                    fn (DemoCircleNewJoyDto $dto) => $dto->toArray()
                )->values()->toArray()
            ),
            // 今日の新歓
            'todayCircleNewJoys'  => Arr::camel_keys(
                (new Collection($circleNewJoys['todayCircleNewJoys']))->map(
                    fn (DemoCircleNewJoyDto $dto) => $dto->toArray()
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
                        'circleNewJoy'   => $arr['circleNewJoyValueObject']->toArray(),
                    ]
                )->values()->toArray()
            ),
            'uuYellArticles' => $articles,
            'announcements'  => Arr::camel_keys($announcements->toArray())['announcements'],
        ];
    }

    private function getCircleNewJoysCacheKey(string $slug, int $circleNewJoyId): string
    {
        $minutes = Carbon::now()->format('YmdHi');

        return 'DemoShowCircleNewJoyController.circleNewJoys'.$slug.'.circleNewJoyId.'.$circleNewJoyId.$minutes;
    }

    private function getAllCircleNewJoysCacheKey(string $slug, int $circleNewJoyId): string
    {
        $minutes = Carbon::now()->format('YmdHi');

        return 'DemoShowCircleNewJoyController.allCircleNewJoys'.$slug.'.circleNewJoyId.'.$circleNewJoyId.$minutes;
    }
}
