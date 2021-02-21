<?php

namespace App\Http\Controllers\Admin\Circle;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Admin\PaginateCircleUsecase;
use App\Usecases\Admin\Params\PaginateCircleUsecaseParams;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Log;

class PaginateCircleController extends Controller
{
    private PaginateCircleUsecase $paginateCircleUsecase;

    public function __construct(PaginateCircleUsecase $paginateCircleUsecase)
    {
        $this->paginateCircleUsecase = $paginateCircleUsecase;
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
        $params = new PaginateCircleUsecaseParams();
        $params->id = $requestId;
        $params->updated_at = $requestUpdatedAt;
        $params->previos = $requestPrevios;
        $params->next = $requestNext;
        if ($params->previos === $params->next) {
            $params->previos = !$params->previos;
        }

        $circles = $this->paginateCircleUsecase->invoke($params);

        return [
            'data' => Arr::camel_keys($circles),
        ];
    }
}
