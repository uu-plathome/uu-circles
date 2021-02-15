<?php

namespace App\Http\Controllers\Main\Circle;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Circle\GetCircleListUsecase;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class IndexCircleController extends Controller
{
    private GetCircleListUsecase $getCircleListUsecase;

    public function __construct(GetCircleListUsecase $getCircleListUsecase)
    {
        $this->getCircleListUsecase = $getCircleListUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $circles = Cache::remember($this->getCacheKey(), 60, function () {
            return $this->getCircleListUsecase->invoke();
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

    private function getCacheKey(): string
    {
        $minutes = Carbon::now()->format('YmdHi');
        return 'main' . $minutes;
    }
}
