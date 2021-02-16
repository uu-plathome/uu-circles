<?php

namespace App\Http\Controllers\Main\Circle;

use App\Enum\CircleType;
use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Circle\Params\SearchCategoryCircleListParam;
use App\Usecases\Main\Circle\SearchCategoryCircleListUsecase;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class SearchCategoryCircleController extends Controller
{
    private SearchCategoryCircleListUsecase $searchCategoryCircleListUsecase;

    public function __construct(SearchCategoryCircleListUsecase $searchCategoryCircleListUsecase)
    {
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
        if (!in_array($category, ['CLUB', CircleType::OFFICIAL_ORGANIZATION, CircleType::UNOFFICIAL_ORGANIZATION, CircleType::STUDENT_GROUP])) {
            return abort(404);
        }

        $params = new SearchCategoryCircleListParam();
        $params->club = $category === 'CLUB';
        $params->officialOrganization = $category === CircleType::OFFICIAL_ORGANIZATION;
        $params->unofficialOrganization = $category === CircleType::UNOFFICIAL_ORGANIZATION;
        $params->sendingOrganization = $category === CircleType::OFFICIAL_ORGANIZATION;
        $params->studentGroup = $category === CircleType::STUDENT_GROUP;

        $circles = Cache::remember($this->getCacheKey($category), 60, function () use ($params) {
            return $this->searchCategoryCircleListUsecase->invoke($params);
        });

        return [
            'data' => Arr::camel_keys(
                (new Collection($circles))->map(
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
        return 'main' . $category . $minutes;
    }
}
