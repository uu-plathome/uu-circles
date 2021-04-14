<?php

namespace App\Http\Controllers\Main\Circle;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Circle\GetCircleBySlugUsecase;
use App\Usecases\Main\CircleNewJoy\GetCircleNewJoyAllPeriodWithLimitByCircleId;
use App\Usecases\Main\UuYell\FetchUuYellArticlesKey;
use App\Usecases\Main\UuYell\FetchUuYellArticlesUsecase;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class GetCircleController extends Controller
{
    private FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase;

    private GetCircleBySlugUsecase $getCircleBySlugUsecase;

    private GetCircleNewJoyAllPeriodWithLimitByCircleId $getCircleNewJoyAllPeriodWithLimitByCircleId;

    /**
     * 新歓取得数
     */
    const TAKE_NEWJOY_COUNT = 6;

    public function __construct(
        FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase,
        GetCircleBySlugUsecase $getCircleBySlugUsecase,
        GetCircleNewJoyAllPeriodWithLimitByCircleId $getCircleNewJoyAllPeriodWithLimitByCircleId
    ) {
        $this->fetchUuYellArticlesUsecase = $fetchUuYellArticlesUsecase;
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
    public function __invoke(Request $request, string $slug)
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

        $articles = Cache::remember(
            FetchUuYellArticlesKey::uuYellCacheKey(),
            60 * 60,
            fn () => $this->fetchUuYellArticlesUsecase->invoke()
        );

        return [
            'data'          => Arr::camel_keys($circle->circleValueObject->toArray()),
            'circleTags'    => Arr::camel_keys($circle->circleTagEntity->toArray()),
            'circleNewJoys' => Arr::camel_keys(
                (new Collection($circleNewJoys))->map(
                    fn (CircleNewJoyValueObject $circleNewJoy) => $circleNewJoy->toArray()
                )->toArray()
            ),
            'uuYellArticles' => $articles,
        ];
    }

    private function getCacheKey(int $circleId): string
    {
        $minutes = Carbon::now()->format('YmdHi');
        return 'GetCircleController.circleNewJoys' . $circleId . $minutes;
    }
}
