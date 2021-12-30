<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Models\Circle;
use App\Support\Arr;
use App\Usecases\AdminManagement\CircleNewJoy\IndexCircleNewJoyUsecase;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;

final class IndexCircleNewJoyController extends Controller
{
    private IndexCircleNewJoyUsecase $indexCircleNewJoyUsecase;

    public function __construct(IndexCircleNewJoyUsecase $indexCircleNewJoyUsecase)
    {
        $this->indexCircleNewJoyUsecase = $indexCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param int     $circleId
     *
     * @return array
     */
    public function __invoke(Request $request, int $circleId): array
    {
        $circle = Circle::findOrFail($circleId);

        return [
            'circle' => Arr::camel_keys(CircleValueObject::byEloquent(
                $circle,
                $circle->circleInformation,
                null
            )->toArray()),

            'circleNewJoys' => Arr::camel_keys(
                $this->indexCircleNewJoyUsecase->invoke($circleId)->toArray()
            ),
        ];
    }
}
