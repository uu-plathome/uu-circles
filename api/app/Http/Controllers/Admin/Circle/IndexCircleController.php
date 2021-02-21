<?php

namespace App\Http\Controllers\Admin\Circle;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Admin\IndexCircleUsecase;
use App\Usecases\Admin\Params\IndexCircleUsecaseParams;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Log;

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
        $request->validate(Arr::camel_keys([
            'id'         => 'nullable|integer',
            'updated_at' => 'nullable|string',
            'previos'    => 'nullable|boolean',
            'next'       => 'nullable|boolean',
        ]));
        $requestId = $request->query('id', null);
        $requestUpdatedAt = $request->query(Str::camel('updated_at'), null);
        $requestPrevios = $request->query('previos', false);
        $requestNext = $request->query('next', false);
        $params = new IndexCircleUsecaseParams();
        $params->id = $requestId;
        $params->updated_at = $requestUpdatedAt;
        $params->previos = $requestPrevios;
        $params->next = $requestNext;
        if ($params->previos === $params->next) {
            $params->previos = !$params->previos;
        }

        $circles = $this->indexCircleUsecase->invoke($params);

        return [
            'data' => Arr::camel_keys($circles),
        ];
    }
}
