<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\Circle;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\UseCases\Main\Announcement\Dto\GetMainViewFixedAnnouncementsUsecaseDto;
use App\UseCases\Main\Announcement\GetMainViewFixedAnnouncementsUsecase;
use App\UseCases\Main\Circle\Dto\MainSimpleCircleListDto;
use App\UseCases\Main\Circle\GetRecommendCircleUsecase;
use App\UseCases\Main\Circle\Params\SearchNameCircleListParam;
use App\UseCases\Main\Circle\SearchNameCircleListUsecase;
use App\UseCases\Main\PageView\TagPageViewRankingUsecase;
use App\UseCases\Main\UuYell\FetchUuYellArticlesKey;
use App\UseCases\Main\UuYell\FetchUuYellArticlesUsecase;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

final class SearchNameCircleController extends Controller
{
    private FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase;

    private GetRecommendCircleUsecase $getRecommendCircleUsecase;

    private GetMainViewFixedAnnouncementsUsecase $getMainViewFixedAnnouncementsUsecase;

    private SearchNameCircleListUsecase $searchNameCircleListUsecase;

    private TagPageViewRankingUsecase $tagPageViewRankingUsecase;

    public function __construct(
        FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase,
        GetRecommendCircleUsecase $getRecommendCircleUsecase,
        GetMainViewFixedAnnouncementsUsecase $getMainViewFixedAnnouncementsUsecase,
        SearchNameCircleListUsecase $searchNameCircleListUsecase,
        TagPageViewRankingUsecase $tagPageViewRankingUsecase
    ) {
        $this->fetchUuYellArticlesUsecase = $fetchUuYellArticlesUsecase;
        $this->getRecommendCircleUsecase = $getRecommendCircleUsecase;
        $this->getMainViewFixedAnnouncementsUsecase = $getMainViewFixedAnnouncementsUsecase;
        $this->searchNameCircleListUsecase = $searchNameCircleListUsecase;
        $this->tagPageViewRankingUsecase = $tagPageViewRankingUsecase;
    }

    public function __invoke(Request $request, string $search)
    {
        Log::debug('#SearchNameCircleController args', [
            'search' => $search,
        ]);

        // サークルの検索
        $param = new SearchNameCircleListParam();
        $param->name = $search;

        $circles = Cache::remember(
            $this->getCacheKey($search),
            60,
            fn () => $this->searchNameCircleListUsecase->invoke($param)
        );

        // おすすめのサークル
        /** @var \App\UseCases\Main\Circle\Dto\MainSimpleCircleListDto $recommendCircles */
        $recommendCircles = Cache::remember(
            GetRecommendCircleUsecase::getCacheKey(),
            GetRecommendCircleUsecase::TTL,
            fn () => $this->getRecommendCircleUsecase->invoke()
        );

        // タグのアクセス数ランキング
        $tagPageViewRanking = Cache::remember(
            TagPageViewRankingUsecase::getCacheKey(),
            TagPageViewRankingUsecase::TTL,
            fn () => $this->tagPageViewRankingUsecase->invoke()
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
            'data' => Arr::camel_keys(
                Arr::get($circles->toArray(), MainSimpleCircleListDto::LIST)
            ),
            'recommendCircles' => Arr::camel_keys(
                Arr::get($recommendCircles->toArray(), MainSimpleCircleListDto::LIST)
            ),
            'tagPageViewRanking' => Arr::camel_keys($tagPageViewRanking->toArray()),
            'uuYellArticles'     => $articles,
            'announcements'      => Arr::camel_keys($announcements->toArray())['announcements'],
        ];
    }

    private function getCacheKey(string $search): string
    {
        $minutes = Carbon::now()->format('YmdHi');

        return 'SearchNameCircleController.main'.$search.$minutes;
    }
}
