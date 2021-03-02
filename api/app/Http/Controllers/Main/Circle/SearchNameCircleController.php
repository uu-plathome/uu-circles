<?php

namespace App\Http\Controllers\Main\Circle;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Circle\GetRandomCircleUsecase;
use App\Usecases\Main\Circle\Params\SearchNameCircleListParam;
use App\Usecases\Main\Circle\SearchNameCircleListUsecase;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class SearchNameCircleController extends Controller
{
    private GetRandomCircleUsecase $getRandomCircleUsecase;

    private SearchNameCircleListUsecase $searchNameCircleListUsecase;

    public function __construct(
        GetRandomCircleUsecase $getRandomCircleUsecase,
        SearchNameCircleListUsecase $searchNameCircleListUsecase
    ) {
        $this->getRandomCircleUsecase = $getRandomCircleUsecase;
        $this->searchNameCircleListUsecase = $searchNameCircleListUsecase;
    }

    public function __invoke(Request $request, string $search)
    {
        Log::debug("#SearchNameCircleController args", [
            'search' => $search,
        ]);

        $param = new SearchNameCircleListParam();
        $param->name = $search;

        $circles = Cache::remember(
            $this->getCacheKey($search),
            60,
            fn () => $this->searchNameCircleListUsecase->invoke($param)
        );

        $recommendCircles = Cache::remember(
            $this->getRecommendCirclesCacheKey(),
            120,
            fn () => $this->getRandomCircleUsecase->invoke(6)
        );

        return [
            'data' => Arr::camel_keys(
                (new Collection($circles))->map(
                    fn (CircleValueObject $circleValueObject) =>
                    Arr::only($circleValueObject->toArray(), [
                        'id', 'name', 'handbill_image_url', 'slug'
                    ])
                )->toArray()
            ),
            'recommendCircles' => Arr::camel_keys(
                (new Collection($recommendCircles))->map(
                    fn (CircleValueObject $circleValueObject) =>
                    Arr::only($circleValueObject->toArray(), [
                        'id', 'name', 'handbill_image_url', 'slug'
                    ])
                )->toArray()
            ),
        ];
    }

    private function getCacheKey(string $search): string
    {
        $minutes = Carbon::now()->format('YmdHi');
        return 'SearchNameCircleController.main' . $search . $minutes;
    }

    private function getRecommendCirclesCacheKey(): string
    {
        $minutes = Carbon::now()->format('YmdHi');
        return 'RecommendCircles' . $minutes;
    }
}
