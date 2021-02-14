<?php

namespace App\Http\Controllers\Main\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Models\CircleNewJoy;
use App\Support\Arr;
use App\Usecases\Main\CircleNewJoy\IndexCircleNewJoyUsecase;
use App\Usecases\Main\Circle\GetCircleBySlugUsecase;
use App\Usecases\Main\CircleNewJoy\GetTodayCircleNewJoyWithLimitUsecase;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class ShowCircleNewJoyController extends Controller
{
    private GetCircleBySlugUsecase $getCircleBySlugUsecase;
    private GetTodayCircleNewJoyWithLimitUsecase $getTodayCircleNewJoyWithLimitUsecase;
    private IndexCircleNewJoyUsecase $indexCircleNewJoyUsecase;

    public function __construct(
        GetCircleBySlugUsecase $getCircleBySlugUsecase,
        GetTodayCircleNewJoyWithLimitUsecase $getTodayCircleNewJoyWithLimitUsecase,
        IndexCircleNewJoyUsecase $indexCircleNewJoyUsecase
    ) {
        $this->getCircleBySlugUsecase = $getCircleBySlugUsecase;
        $this->getTodayCircleNewJoyWithLimitUsecase = $getTodayCircleNewJoyWithLimitUsecase;
        $this->indexCircleNewJoyUsecase = $indexCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, string $slug, int $circleNewJoyId)
    {
        $circle = $this->getCircleBySlugUsecase->invoke($slug);
        $circleNewJoy = CircleNewJoy::nowPublic(Carbon::now())->findOrFail($circleNewJoyId);
        $circleNewJoys = $this->indexCircleNewJoyUsecase->invoke($circle->id);
        $allCircleNewJoys = $this->getTodayCircleNewJoyWithLimitUsecase->invoke();

        return Arr::camel_keys([
            'circle'       => $circle->toArray(),
            'circleNewJoy' => CircleNewJoyValueObject::byEloquent($circleNewJoy),
            // 新歓開催済み
            'pastCircleNewJoys'   => (new Collection($circleNewJoys['pastCircleNewJoys']))->map(
                fn (CircleNewJoyValueObject $circleNewJoyValueObject) => $circleNewJoyValueObject->toArray()
            )->values()->toArray(),
            // 新歓開催前
            'futureCircleNewJoys' => (new Collection($circleNewJoys['futureCircleNewJoys']))->map(
                fn (CircleNewJoyValueObject $circleNewJoyValueObject) => $circleNewJoyValueObject->toArray()
            )->values()->toArray(),
            // 現在開催中
            'nowCircleNewJoys'    => (new Collection($circleNewJoys['nowCircleNewJoys']))->map(
                fn (CircleNewJoyValueObject $circleNewJoyValueObject) => $circleNewJoyValueObject->toArray()
            )->values()->toArray(),
            // 今日の新歓
            'todayCircleNewJoys'  => (new Collection($circleNewJoys['todayCircleNewJoys']))->map(
                fn (CircleNewJoyValueObject $circleNewJoyValueObject) => $circleNewJoyValueObject->toArray()
            )->values()->toArray(),
            // 今日の新歓 全て
            'allTodayCircleNewJoys' => (new Collection($allCircleNewJoys['todayCircleNewJoys']))->map(
                fn (array $arr) => [
                    'slug'         => $arr['slug'],
                    'circleNewJoy' => $arr['circleNewJoyValueObject']->toArray()
                ]
            )->values()->toArray(),
        ]);
    }
}
