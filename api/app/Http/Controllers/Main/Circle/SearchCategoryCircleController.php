<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\Circle;

use App\Enum\SlugProperty\CategorySlugProperty;
use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\UseCases\Main\Announcement\Dto\GetMainViewFixedAnnouncementsUsecaseDto;
use App\UseCases\Main\Announcement\GetMainViewFixedAnnouncementsUsecase;
use App\UseCases\Main\Circle\Dto\MainSimpleCircleListDto;
use App\UseCases\Main\Circle\GetRecommendCircleUsecase;
use App\UseCases\Main\Circle\Params\SearchCategoryCircleListParam;
use App\UseCases\Main\Circle\SearchCategoryCircleListUsecase;
use App\UseCases\Main\PageView\TagPageViewRankingUsecase;
use App\UseCases\Main\UuYell\FetchUuYellArticlesKey;
use App\UseCases\Main\UuYell\FetchUuYellArticlesUsecase;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

final class SearchCategoryCircleController extends Controller
{
    private FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase;

    private GetRecommendCircleUsecase $getRecommendCircleUsecase;

    private GetMainViewFixedAnnouncementsUsecase $getMainViewFixedAnnouncementsUsecase;

    private SearchCategoryCircleListUsecase $searchCategoryCircleListUsecase;

    private TagPageViewRankingUsecase $tagPageViewRankingUsecase;

    public function __construct(
        FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase,
        GetRecommendCircleUsecase $getRecommendCircleUsecase,
        GetMainViewFixedAnnouncementsUsecase $getMainViewFixedAnnouncementsUsecase,
        SearchCategoryCircleListUsecase $searchCategoryCircleListUsecase,
        TagPageViewRankingUsecase $tagPageViewRankingUsecase
    ) {
        $this->fetchUuYellArticlesUsecase = $fetchUuYellArticlesUsecase;
        $this->getRecommendCircleUsecase = $getRecommendCircleUsecase;
        $this->getMainViewFixedAnnouncementsUsecase = $getMainViewFixedAnnouncementsUsecase;
        $this->searchCategoryCircleListUsecase = $searchCategoryCircleListUsecase;
        $this->tagPageViewRankingUsecase = $tagPageViewRankingUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param string                   $category
     *
     * @return array|void
     */
    public function __invoke(Request $request, string $category)
    {
        Log::debug('#SearchCategoryCircleController args', [
            'category' => $category,
        ]);

        if (!in_array($category, CategorySlugProperty::getAll())) {
            return abort(404);
        }

        $params = new SearchCategoryCircleListParam();
        $params->club = $category === CategorySlugProperty::club;
        $params->officialOrganization = $category === CategorySlugProperty::official_organization;
        $params->unofficialOrganization = $category === CategorySlugProperty::unofficial_organization;
        $params->sendingOrganization = $category === CategorySlugProperty::official_organization;
        $params->studentGroup = $category === CategorySlugProperty::student_group;

        /** @var \App\UseCases\Main\Circle\Dto\MainSimpleCircleListDto $recommendCircles */
        $circles = Cache::remember($this->getCacheKey($category), 60, function () use ($params) {
            return $this->searchCategoryCircleListUsecase->invoke($params);
        });

        // おすすめサークル
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

    private function getCacheKey(string $category): string
    {
        $minutes = Carbon::now()->format('YmdHi');

        return 'SearchCategoryCircleController.main' . $category . $minutes;
    }
}
