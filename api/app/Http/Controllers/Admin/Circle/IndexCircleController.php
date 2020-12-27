<?php

namespace App\Http\Controllers\Admin\Circle;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Admin\IndexCircleUsecase;
use Illuminate\Http\Request;

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
    public function __invoke(Request $request)
    {
        $circles = $this->indexCircleUsecase->invoke();

        return [
            'data' => Arr::camel_keys($circles)
        ];
    }
}
