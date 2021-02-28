<?php

namespace App\Http\Controllers\Main\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\CircleNewJoy\GetTodayCircleNewJoyUsecase;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class TodayCircleNewJoyController extends Controller
{
    private GetTodayCircleNewJoyUsecase $getTodayCircleNewJoyUsecase;

    public function __construct(
        GetTodayCircleNewJoyUsecase $getTodayCircleNewJoyUsecase
    ) {
        $this->getTodayCircleNewJoyUsecase = $getTodayCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        Log::debug("#TodayCircleNewJoyController args: none");

        $circleNewJoys = Cache::remember(
            $this->getCircleNewJoysCacheKey(),
            60,
            fn () => $this->getTodayCircleNewJoyUsecase->invoke()
        );

        return Arr::camel_keys([
            'todayCircleNewJoys'  => (new Collection($circleNewJoys['todayCircleNewJoys']))->map(
                fn (array $arr) => [
                    'slug'           => $arr['slug'],
                    'name'           => $arr['name'],
                    'circle_type'    => $arr['circle_type'],
                    'main_image_url' => $arr['main_image_url'],
                    'circleNewJoy'   => $arr['circleNewJoyValueObject']->toArray()
                ]
            )->values()->toArray(),
            'futureCircleNewJoys' => (new Collection($circleNewJoys['futureCircleNewJoys']))->map(
                fn (array $arr) => [
                    'slug'           => $arr['slug'],
                    'name'           => $arr['name'],
                    'circle_type'    => $arr['circle_type'],
                    'main_image_url' => $arr['main_image_url'],
                    'circleNewJoy'   => $arr['circleNewJoyValueObject']->toArray()
                ]
            )->values()->toArray(),
        ]);
    }

    private function getCircleNewJoysCacheKey(): string
    {
        $minutes = Carbon::now()->format('YmdHi');
        return 'TodayCircleNewJoyController.circleNewJoys' . $minutes;
    }
}
