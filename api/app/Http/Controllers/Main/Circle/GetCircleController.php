<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\Circle;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\UseCases\Main\Announcement\Dto\GetMainViewFixedAnnouncementsUsecaseDto;
use App\UseCases\Main\Announcement\GetMainViewFixedAnnouncementsUsecase;
use App\UseCases\Main\Circle\GetCircleBySlugUsecase;
use App\UseCases\Main\CircleNewJoy\GetCircleNewJoyAllPeriodWithLimitByCircleId;
use App\UseCases\Main\UuYell\FetchUuYellArticlesKey;
use App\UseCases\Main\UuYell\FetchUuYellArticlesUsecase;
use App\UseCases\Main\WordPress\FetchWordPressPostsUsecase;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

final class GetCircleController extends Controller
{
    /**
     * 新歓取得数.
     */
    const TAKE_NEWJOY_COUNT = 6;

    public function __construct(
        private FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase,
        private FetchWordPressPostsUsecase $fetchWordPressPostsUsecase,
        private GetCircleBySlugUsecase $getCircleBySlugUsecase,
        private GetCircleNewJoyAllPeriodWithLimitByCircleId $getCircleNewJoyAllPeriodWithLimitByCircleId,
        private GetMainViewFixedAnnouncementsUsecase $getMainViewFixedAnnouncementsUsecase,
    ) {
    }

    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param string                   $slug
     *
     * @return array
     */
    public function __invoke(Request $request, string $slug): array
    {
        Log::debug('#GetCircleController args', [
            'slug' => $slug,
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

        // メイン画面に固定するお知らせの取得
        /** @var GetMainViewFixedAnnouncementsUsecaseDto $announcements */
        $announcements = Cache::remember(
            GetMainViewFixedAnnouncementsUsecase::getCacheKey(),
            GetMainViewFixedAnnouncementsUsecase::TTL,
            fn () => $this->getMainViewFixedAnnouncementsUsecase->invoke()
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
            'announcements'    => Arr::camel_keys($announcements->toArray())['announcements'],
        ];
    }

    private function getCacheKey(int $circleId): string
    {
        $minutes = Carbon::now()->format('YmdHi');

        return 'GetCircleController.circleNewJoys'.$circleId.$minutes;
    }
}
