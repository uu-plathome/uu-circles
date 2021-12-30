<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\Circle;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\UseCases\Main\Announcement\Dto\GetMainViewFixedAnnouncementsUsecaseDto;
use App\UseCases\Main\Announcement\GetMainViewFixedAnnouncementsUsecase;
use App\UseCases\Main\Circle\Dto\MainSimpleCircleListDto;
use App\UseCases\Main\Circle\GetCircleListUsecase;
use App\UseCases\Main\PageView\TagPageViewRankingUsecase;
use App\UseCases\Main\UuYell\FetchUuYellArticlesKey;
use App\UseCases\Main\UuYell\FetchUuYellArticlesUsecase;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

final class IndexCircleController extends Controller
{
    private FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase;
    private GetCircleListUsecase $getCircleListUsecase;
    private GetMainViewFixedAnnouncementsUsecase $getMainViewFixedAnnouncementsUsecase;
    private TagPageViewRankingUsecase $tagPageViewRankingUsecase;

    public function __construct(
        FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase,
        GetCircleListUsecase $getCircleListUsecase,
        GetMainViewFixedAnnouncementsUsecase $getMainViewFixedAnnouncementsUsecase,
        TagPageViewRankingUsecase $tagPageViewRankingUsecase
    ) {
        $this->fetchUuYellArticlesUsecase = $fetchUuYellArticlesUsecase;
        $this->getCircleListUsecase = $getCircleListUsecase;
        $this->getMainViewFixedAnnouncementsUsecase = $getMainViewFixedAnnouncementsUsecase;
        $this->tagPageViewRankingUsecase = $tagPageViewRankingUsecase;
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
        Log::debug('#IndexCircleController args none');

        // サークル一覧
        /** @var \App\UseCases\Main\Circle\Dto\MainSimpleCircleListDto $recommendCircles */
        $circles = Cache::remember(
            GetCircleListUsecase::getCacheKey(),
            GetCircleListUsecase::TTL,
            fn () => $this->getCircleListUsecase->invoke()
        );

        // タグのアクセス数ランキング
        $tagPageViewRanking = Cache::remember(
            TagPageViewRankingUsecase::getCacheKey(),
            TagPageViewRankingUsecase::TTL,
            fn () => $this->tagPageViewRankingUsecase->invoke()
        );

        // uu-yellの最新記事一覧
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
            'data' => Arr::camel_keys(
                Arr::get($circles->toArray(), MainSimpleCircleListDto::LIST)
            ),
            'tagPageViewRanking' => Arr::camel_keys($tagPageViewRanking->toArray()),
            'uuYellArticles'     => $articles,
            'announcements'      => Arr::camel_keys($announcements->toArray())['announcements'],
        ];
    }

    private function getCacheKey(): string
    {
        $minutes = Carbon::now()->format('YmdHi');

        return 'main.circle.IndexCircleController.'.$minutes;
    }
}
