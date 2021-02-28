<?php

namespace App\Http\Controllers\Main\Circle;

use App\Enum\SlugProperty\CategorySlugProperty;
use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Circle\GetRandomCircleUsecase;
use App\Usecases\Main\Circle\Params\SearchCategoryCircleListParam;
use App\Usecases\Main\Circle\SearchCategoryCircleListUsecase;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class SearchCategoryCircleController extends Controller
{
    private GetRandomCircleUsecase $getRandomCircleUsecase;

    private SearchCategoryCircleListUsecase $searchCategoryCircleListUsecase;

    public function __construct(
        GetRandomCircleUsecase $getRandomCircleUsecase,
        SearchCategoryCircleListUsecase $searchCategoryCircleListUsecase
    ) {
        $this->getRandomCircleUsecase = $getRandomCircleUsecase;
        $this->searchCategoryCircleListUsecase = $searchCategoryCircleListUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, string $category)
    {
        Log::debug("#SearchCategoryCircleController args", [
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

        $circles = Cache::remember($this->getCacheKey($category), 60, function () use ($params) {
            return $this->searchCategoryCircleListUsecase->invoke($params);
        });

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

    private function getCacheKey(string $category): string
    {
        $minutes = Carbon::now()->format('YmdHi');
        return 'SearchCategoryCircleController.main' . $category . $minutes;
    }

    private function getRecommendCirclesCacheKey(): string
    {
        $minutes = Carbon::now()->format('YmdHi');
        return 'RecommendCircles' . $minutes;
    }
}
