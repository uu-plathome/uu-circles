<?php

namespace App\Http\Controllers\Circle\CircleNewJoy;

use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Models\Circle;
use App\Support\Arr;
use App\Usecases\CircleManagement\CircleNewJoy\IndexCircleNewJoyUsecase;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class IndexCircleNewJoyController extends Controller
{
    use Permission;

    private IndexCircleNewJoyUsecase $indexCircleNewJoyUsecase;

    public function __construct(IndexCircleNewJoyUsecase $indexCircleNewJoyUsecase)
    {
        $this->indexCircleNewJoyUsecase = $indexCircleNewJoyUsecase;
    }

    public function __invoke(Request $request, int $circleId)
    {
        Log::debug('IndexCircleNewJoyController args none');

        /** @var \App\Models\User */
        $user = $request->user();
        $this->permissionCircle($user, $circleId);

        $circle = Circle::whereRelease(true)->findOrFail($circleId);
        $circleNewJoys = $this->indexCircleNewJoyUsecase->invoke($circleId);

        return [
            'circle' => Arr::camel_keys(
                CircleValueObject::byEloquent(
                    $circle,
                    $circle->circleInformation,
                    null
                )->toArray()
            ),

            'circleNewJoys' => Arr::camel_keys(
                (new Collection($circleNewJoys))->map(
                    fn ($_o) => $_o->toArray()
                )->toArray()
            ),
        ];
    }
}
