<?php

namespace App\Http\Controllers\Main\Circle;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Circle\GetCircleBySlugUsecase;
use App\Usecases\Main\CircleNewJoy\GetCircleNewJoyAllPeriodWithLimitByCircleId;
use App\Usecases\Main\UuYell\FetchUuYellArticlesForCirclesKey;
use App\Usecases\Main\UuYell\FetchUuYellArticlesForCirclesUsecase;
use App\Usecases\Main\UuYell\FetchUuYellArticlesKey;
use App\Usecases\Main\UuYell\FetchUuYellArticlesUsecase;
use App\Usecases\Main\UuYell\Params\FetchUuYellArticlesForCirclesUsecaseParam;
use App\Usecases\Main\WordPress\FetchWordPressPostsUsecase;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class GetCircleController extends Controller
{
    private FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase;

    private FetchWordPressPostsUsecase $fetchWordPressPostsUsecase;

    private GetCircleBySlugUsecase $getCircleBySlugUsecase;

    private GetCircleNewJoyAllPeriodWithLimitByCircleId $getCircleNewJoyAllPeriodWithLimitByCircleId;

    /**
     * 新歓取得数
     */
    const TAKE_NEWJOY_COUNT = 6;

    public function __construct(
        FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase,
        FetchWordPressPostsUsecase $fetchWordPressPostsUsecase,
        GetCircleBySlugUsecase $getCircleBySlugUsecase,
        GetCircleNewJoyAllPeriodWithLimitByCircleId $getCircleNewJoyAllPeriodWithLimitByCircleId
    ) {
        $this->fetchUuYellArticlesUsecase = $fetchUuYellArticlesUsecase;
        $this->fetchWordPressPostsUsecase = $fetchWordPressPostsUsecase;
        $this->getCircleBySlugUsecase = $getCircleBySlugUsecase;
        $this->getCircleNewJoyAllPeriodWithLimitByCircleId = $getCircleNewJoyAllPeriodWithLimitByCircleId;
    }

    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param string $slug
     * @return array
     */
    public function __invoke(Request $request, string $slug): array
    {
        Log::debug("#GetCircleController args", [
            'slug' => $slug
        ]);

        $circle = $this->getCircleBySlugUsecase->invoke($slug);

        $circleNewJoys = Cache::remember(
            $this->getCacheKey($circle->circleValueObject->id),
            60,
            fn () => $this->getCircleNewJoyAllPeriodWithLimitByCircleId->invoke(
                $circle->circleValueObject->id,
                self::TAKE_NEWJOY_COUNT
            )
        );

        // uu-yellの最新の記事を取得する
        $articles = Cache::remember(
            FetchUuYellArticlesKey::uuYellCacheKey(),
            FetchUuYellArticlesKey::TTL,
            fn () => $this->fetchUuYellArticlesUsecase->invoke()
        );

        // サークルが持っているWordPressの記事を取得
        $wpPosts = $circle->circleValueObject->is_view_wp_post ? Cache::remember(
            FetchWordPressPostsUsecase::getCacheKey(
                $circle->circleValueObject->wp_url,
                $circle->circleValueObject->wp_tag_taxonomy
            ),
            FetchWordPressPostsUsecase::TTL,
            fn () => $this->fetchWordPressPostsUsecase->invoke(
                $circle->circleValueObject->wp_url,
                $circle->circleValueObject->wp_tag_taxonomy
            )
        ) : [
            'postsNotTags'   => [],
            'postsExistTags' => [],
        ];

        return [
            'data'          => Arr::camel_keys($circle->circleValueObject->toArray()),
            'circleTags'    => Arr::camel_keys($circle->circleTagEntity->toArray()),
            'circleNewJoys' => Arr::camel_keys(
                (new Collection($circleNewJoys))->map(
                    fn (CircleNewJoyValueObject $circleNewJoy) => $circleNewJoy->toArray()
                )->toArray()
            ),
            'uuYellArticles'   => $articles,
            'wpPosts'          => $wpPosts,
        ];
    }

    private function getCacheKey(int $circleId): string
    {
        $minutes = Carbon::now()->format('YmdHi');
        return 'GetCircleController.circleNewJoys' . $circleId . $minutes;
    }
}
