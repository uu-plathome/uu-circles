<?php

namespace App\Http\Controllers\Admin\Circle;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Admin\IndexCircleUsecase;
use App\Usecases\Admin\Params\IndexCircleUsecaseParams;
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
        $request->validate([
            'id' => 'nullable|integer',
        ]);
        $requestId = $request->query('id', null);
        $params = new IndexCircleUsecaseParams();
        $params->id = $requestId;

        $circles = $this->indexCircleUsecase->invoke($params);

        return [
            'data' => Arr::camel_keys($circles),
        ];
    }
}
