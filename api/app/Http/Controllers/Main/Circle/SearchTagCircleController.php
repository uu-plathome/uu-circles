<?php

namespace App\Http\Controllers\Main\Circle;

use App\Enum\SlugProperty\TagSlugProperty;
use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Circle\Params\SearchTagCircleListParam;
use App\Usecases\Main\Circle\SearchTagCircleListUsecase;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class SearchTagCircleController extends Controller
{
    private SearchTagCircleListUsecase $searchTagCircleListUsecase;

    public function __construct(SearchTagCircleListUsecase $searchTagCircleListUsecase)
    {
        $this->searchTagCircleListUsecase = $searchTagCircleListUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, string $tag)
    {
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
        $circles = $this->searchTagCircleListUsecase->invoke($param);

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
}
