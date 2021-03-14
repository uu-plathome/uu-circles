<?php

namespace App\Http\Controllers\Circle\Circle;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Requests\Circle\Circle\UpdateCircleFormRequest;
use App\Support\Arr;
use App\Usecases\CircleManagement\Circle\UpdateCircleUsecase;
use Illuminate\Support\Facades\Log;

class UpdateCircleController extends Controller
{
    use Permission;

    private UpdateCircleUsecase $updateCircleUsecase;

    public function __construct(UpdateCircleUsecase $updateCircleUsecase)
    {
        $this->updateCircleUsecase = $updateCircleUsecase;
    }


    /**
     * Handle the incoming request.
     *
     * @param UpdateCircleFormRequest $request
     * @return array
     * @throws \Exception
     */
    public function __invoke(UpdateCircleFormRequest $request, int $circleId): array
    {
        Log::debug('UpdateCircleController args none');

        /** @var \App\Models\User */
        $user = $request->user();
        $this->permissionCircle($user, $circleId);

        $circle = $this->updateCircleUsecase->invoke(
            $request->makeCircleValueObject()
        );

        return [
            'data' => Arr::camel_keys($circle->toArray())
        ];
    }
}
