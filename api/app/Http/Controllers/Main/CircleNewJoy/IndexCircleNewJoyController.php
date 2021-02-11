<?php

namespace App\Http\Controllers\Main\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Circle\GetCircleBySlugUsecase;
use App\Usecases\Main\CircleNewJoy\IndexCircleNewJoyUsecase;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class IndexCircleNewJoyController extends Controller
{
    private GetCircleBySlugUsecase $getCircleBySlugUsecase;
    private IndexCircleNewJoyUsecase $indexCircleNewJoyUsecase;

    public function __construct(
        GetCircleBySlugUsecase $getCircleBySlugUsecase,
        IndexCircleNewJoyUsecase $indexCircleNewJoyUsecase
    ) {
        $this->getCircleBySlugUsecase = $getCircleBySlugUsecase;
        $this->indexCircleNewJoyUsecase = $indexCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, string $slug)
    {
        $circle = $this->getCircleBySlugUsecase->invoke($slug);
        $circleNewJoys = $this->indexCircleNewJoyUsecase->invoke($circle->id);

        return Arr::camel_keys([
            'circle'              => $circleNewJoys['circle'],
            // 新歓開催済み
            'pastCircleNewJoys'   => (new Collection($circleNewJoys['pastCircleNewJoys']))->map(
                fn (CircleNewJoyValueObject $circleNewJoyValueObject) => $circleNewJoyValueObject->toArray()
            )->toArray(),
            // 新歓開催前
            'futureCircleNewJoys' => (new Collection($circleNewJoys['futureCircleNewJoys']))->map(
                fn (CircleNewJoyValueObject $circleNewJoyValueObject) => $circleNewJoyValueObject->toArray()
            )->toArray(),
            // 現在開催中
            'nowCircleNewJoys'    => (new Collection($circleNewJoys['nowCircleNewJoys']))->map(
                fn (CircleNewJoyValueObject $circleNewJoyValueObject) => $circleNewJoyValueObject->toArray()
            )->toArray(),
            // 今日の新歓
            'todayCircleNewJoys'  => (new Collection($circleNewJoys['todayCircleNewJoys']))->map(
                fn (CircleNewJoyValueObject $circleNewJoyValueObject) => $circleNewJoyValueObject->toArray()
            )->toArray(),
        ]);
    }
}
