<?php

namespace App\Http\Controllers\Main\Circle;

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
    const official_organization = 'official_organization';
    const unofficial_organization = 'unofficial_organization';
    const student_group = 'student_group';
    const club = 'club';

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
        if (!in_array($category, [self::club, self::official_organization, self::unofficial_organization, self::student_group])) {
            return abort(404);
        }

        $params = new SearchCategoryCircleListParam();
        $params->club = $category === self::club;
        $params->officialOrganization = $category === self::official_organization;
        $params->unofficialOrganization = $category === self::unofficial_organization;
        $params->sendingOrganization = $category === self::official_organization;
        $params->studentGroup = $category === self::student_group;

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
