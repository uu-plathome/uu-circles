<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Circle;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Admin\IndexCircleUsecase;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

final class IndexCircleController extends Controller
{
    private IndexCircleUsecase $indexCircleUsecase;

    public function __construct(IndexCircleUsecase $indexCircleUsecase)
    {
        $this->indexCircleUsecase = $indexCircleUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function __invoke(Request $request): array
    {
        Log::debug('IndexCircleController args none');

        $circles = $this->indexCircleUsecase->invoke();

        return [
            'data'                             => (new Collection($circles))->map(
                fn (CircleValueObject $circle) => Arr::camel_keys($circle->toArray())
            ),
        ];
    }
}
