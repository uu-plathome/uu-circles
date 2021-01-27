<?php

namespace App\Http\Controllers\Admin\Circle;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Admin\IndexCircleUsecase;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class IndexCircleController extends Controller
{
    private IndexCircleUsecase $indexCircleUsecase;

    public function __construct(IndexCircleUsecase $indexCircleUsecase)
    {
        $this->indexCircleUsecase = $indexCircleUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function __invoke(Request $request): array
    {
        $circles = $this->indexCircleUsecase->invoke();
        \Log::debug(Arr::camel_keys($circles));

        return [
            'data' => (new Collection($circles))->map(
                fn (CircleValueObject $circle) => Arr::camel_keys($circle->toArray())
            )
        ];
    }
}
