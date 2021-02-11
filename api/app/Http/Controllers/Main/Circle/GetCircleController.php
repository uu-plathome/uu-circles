<?php

namespace App\Http\Controllers\Main\Circle;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Circle\GetCircleBySlugUsecase;
use Illuminate\Http\Request;

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
        $circle = $this->getCircleBySlugUsecase->invoke($slug);

        return [
            'data' => Arr::camel_keys($circle->toArray()),
        ];
    }
}
