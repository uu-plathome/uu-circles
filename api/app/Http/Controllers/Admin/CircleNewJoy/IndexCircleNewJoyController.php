<?php

namespace App\Http\Controllers\Admin\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Admin\IndexCircleNewJoyUsecase;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class IndexCircleNewJoyController extends Controller
{
    private IndexCircleNewJoyUsecase $indexCircleNewJoyUsecase;

    public function __construct(IndexCircleNewJoyUsecase $indexCircleNewJoyUsecase)
    {
        $this->indexCircleNewJoyUsecase = $indexCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, int $id)
    {
        return [
            'data' => Arr::camel_keys(
                (new Collection($this->indexCircleNewJoyUsecase->invoke($id)))->map(
                    fn ($_o) => $_o->toArray()
                )->toArray()
            ),
        ];
    }
}
