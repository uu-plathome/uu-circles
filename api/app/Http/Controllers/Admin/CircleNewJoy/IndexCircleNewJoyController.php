<?php

namespace App\Http\Controllers\Admin\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Models\Circle;
use App\Support\Arr;
use App\Usecases\Admin\IndexCircleNewJoyUsecase;
use App\ValueObjects\CircleValueObject;
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
     * @param Request $request
     * @param int $id
     * @return array
     */
    public function __invoke(Request $request, int $id): array
    {
        $circle = Circle::findOrFail($id);

        return [
            'circle' => Arr::camel_keys(CircleValueObject::byEloquent(
                $circle,
                $circle->circleInformation
            )->toArray()),

            'circleNewJoys' => Arr::camel_keys(
                (new Collection($this->indexCircleNewJoyUsecase->invoke($id)))->map(
                    fn ($_o) => $_o->toArray()
                )->toArray()
            ),
        ];
    }
}
