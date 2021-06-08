<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\Circle;

use App\Enum\SlugProperty\TagSlugProperty;
use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Announcement\Dto\GetMainViewFixedAnnouncementsUsecaseDto;
use App\Usecases\Main\Announcement\GetMainViewFixedAnnouncementsUsecase;
use App\Usecases\Main\Circle\Dto\MainSimpleCircleListDto;
use App\Usecases\Main\Circle\GetRecommendCircleUsecase;
use App\Usecases\Main\Circle\Params\SearchTagCircleListParam;
use App\Usecases\Main\Circle\SearchTagCircleListUsecase;
use App\Usecases\Main\PageView\TagPageViewRankingUsecase;
use App\Usecases\Main\UuYell\FetchUuYellArticlesKey;
use App\Usecases\Main\UuYell\FetchUuYellArticlesUsecase;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

final class SearchTagCircleController extends Controller
{
    private FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase;

    private GetRecommendCircleUsecase $getRecommendCircleUsecase;

    private GetMainViewFixedAnnouncementsUsecase $getMainViewFixedAnnouncementsUsecase;

    private SearchTagCircleListUsecase $searchTagCircleListUsecase;

    private TagPageViewRankingUsecase $tagPageViewRankingUsecase;

    public function __construct(
        FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase,
        GetRecommendCircleUsecase $getRecommendCircleUsecase,
        GetMainViewFixedAnnouncementsUsecase $getMainViewFixedAnnouncementsUsecase,
        SearchTagCircleListUsecase $searchTagCircleListUsecase,
        TagPageViewRankingUsecase $tagPageViewRankingUsecase
    ) {
        $this->fetchUuYellArticlesUsecase = $fetchUuYellArticlesUsecase;
        $this->getRecommendCircleUsecase = $getRecommendCircleUsecase;
        $this->getMainViewFixedAnnouncementsUsecase = $getMainViewFixedAnnouncementsUsecase;
        $this->searchTagCircleListUsecase = $searchTagCircleListUsecase;
        $this->tagPageViewRankingUsecase = $tagPageViewRankingUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param string $tag
     * @return array|void
     */
    public function __invoke(Request $request, string $tag)
    {
        Log::debug("#SearchTagCircleController args", [
            'tag' => $tag,
        ]);

        if (!$this->isExistTag($tag)) {
            return abort(404);
        }

        $param = new SearchTagCircleListParam();
        $param->sport = $tag === TagSlugProperty::sport;
        $param->music = $tag === TagSlugProperty::music;
        $param->culture = $tag === TagSlugProperty::culture;
        $param->nature = $tag === TagSlugProperty::nature;
        $param->community = $tag === TagSlugProperty::community;
        $param->international = $tag === TagSlugProperty::international;
        $param->incare = $tag === TagSlugProperty::incare;
        $param->programming = $tag === TagSlugProperty::programming;
        $param->volunteer = $tag === TagSlugProperty::volunteer;
        $param->active_activity = $tag === TagSlugProperty::active_activity;
        $param->loose = $tag === TagSlugProperty::loose;
        $param->monday = $tag === TagSlugProperty::monday;
        $param->tuesday = $tag === TagSlugProperty::tuesday;
        $param->wednesday = $tag === TagSlugProperty::wednesday;
        $param->thursday = $tag === TagSlugProperty::thursday;
        $param->friday = $tag === TagSlugProperty::friday;
        $param->only_monday = $tag === TagSlugProperty::only_monday;
        $param->only_tuesday = $tag === TagSlugProperty::only_tuesday;
        $param->only_wednesday = $tag === TagSlugProperty::only_wednesday;
        $param->only_thursday = $tag === TagSlugProperty::only_thursday;
        $param->only_friday = $tag === TagSlugProperty::only_friday;
        $param->holiday = $tag === TagSlugProperty::holiday;
        $param->mammoth = $tag === TagSlugProperty::mammoth;
        $param->urgent_recruitment = $tag === TagSlugProperty::urgent_recruitment;
        $param->mystery = $tag === TagSlugProperty::mystery;
        $param->online = $tag === TagSlugProperty::online;
        $param->mine = $tag === TagSlugProperty::mine;
        $param->yoto = $tag === TagSlugProperty::yoto;
        $circles = Cache::remember(
            $this->getCacheKey($tag),
            60,
            fn () => $this->searchTagCircleListUsecase->invoke($param)
        );

        // おすすめサークル
        /** @var \App\Usecases\Main\Circle\Dto\MainSimpleCircleListDto $recommendCircles */
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
            'uuYellArticles' => $articles,
            'announcements'  => Arr::camel_keys($announcements->toArray())['announcements'],
        ];
    }

    /**
     * タグが存在しているかどうか
     *
     * @param string $tag
     * @return boolean
     */
    private function isExistTag(string $tag): bool
    {
        return in_array($tag, TagSlugProperty::getAll(), true);
    }

    private function getCacheKey(string $tag): string
    {
        $minutes = Carbon::now()->format('YmdHi');
        return 'SearchTagCircleController.main' . $tag . $minutes;
    }
}
