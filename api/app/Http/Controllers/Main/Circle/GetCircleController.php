<?php

namespace App\Http\Controllers\Main\Circle;

use App\Enum\Property\CircleNewJoyProperty;
use App\Http\Controllers\Controller;
use App\Models\CircleNewJoy;
use App\Support\Arr;
use App\Usecases\Main\Circle\GetCircleBySlugUsecase;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class GetCircleController extends Controller
{
    private GetCircleBySlugUsecase $getCircleBySlugUsecase;

    public function __construct(GetCircleBySlugUsecase $getCircleBySlugUsecase)
    {
        $this->getCircleBySlugUsecase = $getCircleBySlugUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, string $slug)
    {
        $now = Carbon::now();
        $circle = $this->getCircleBySlugUsecase->invoke($slug);

        // 新歓開催前のものを取得
        $circleNewJoys = CircleNewJoy::whereCircleId($circle->id)
            ->nowPublic($now)
            ->where(CircleNewJoyProperty::start_date, '>=', $now)
            ->orderBy(CircleNewJoyProperty::start_date)
            ->take(3)
            ->get()
            ->toArray();

        // 新歓が3件に満たない時、過去の新歓も取得
        if (count($circleNewJoys) < 3) {
            $count = count($circleNewJoys);

            $appendCircleNewJoys = CircleNewJoy::whereCircleId($circle->id)
                ->nowPublic($now)
                ->where(CircleNewJoyProperty::start_date, '<', $now)
                ->orderByDesc(CircleNewJoyProperty::start_date)
                ->take(3 - $count)
                ->get()
                ->toArray();

            $circleNewJoys = [
                ...$circleNewJoys,
                ...$appendCircleNewJoys,
            ];
        }

        return Arr::camel_keys([
            'data'          => $circle->toArray(),
            'circleNewJoys' => (new Collection($circleNewJoys))->map(
                fn (array $circleNewJoy) => CircleNewJoyValueObject::of($circleNewJoy)->toArray()
            )->toArray(),
        ]);
    }
}
