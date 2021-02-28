<?php

namespace App\Http\Controllers\Main\Circle;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Circle\GetCircleBySlugUsecase;
use App\Usecases\Main\CircleNewJoy\GetCircleNewJoyAllPeriodWithLimitByCircleId;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class GetCircleController extends Controller
{
    private GetCircleBySlugUsecase $getCircleBySlugUsecase;

    private GetCircleNewJoyAllPeriodWithLimitByCircleId $getCircleNewJoyAllPeriodWithLimitByCircleId;

    const TAKE_NEWJOY_COUNT = 6;

    public function __construct(
        GetCircleBySlugUsecase $getCircleBySlugUsecase,
        GetCircleNewJoyAllPeriodWithLimitByCircleId $getCircleNewJoyAllPeriodWithLimitByCircleId
    ) {
        $this->getCircleBySlugUsecase = $getCircleBySlugUsecase;
        $this->getCircleNewJoyAllPeriodWithLimitByCircleId = $getCircleNewJoyAllPeriodWithLimitByCircleId;
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

        $circleNewJoys = Cache::remember(
            $this->getCacheKey($circle->id),
            60,
            fn () => $this->getCircleNewJoyAllPeriodWithLimitByCircleId->invoke($circle->id, self::TAKE_NEWJOY_COUNT)
        );

        return Arr::camel_keys([
            'data'          => $circle->toArray(),
            'circleNewJoys' => (new Collection($circleNewJoys))->map(
                fn (CircleNewJoyValueObject $circleNewJoy) => $circleNewJoy->toArray()
            )->toArray(),
        ]);
    }

    private function getCacheKey(int $circleId): string
    {
        $minutes = Carbon::now()->format('YmdHi');
        return 'GetCircleController.circleNewJoys' . $circleId . $minutes;
    }
}
