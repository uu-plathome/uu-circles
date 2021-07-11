<?php

declare(strict_types=1);

namespace App\Http\Controllers\Circle\CircleNewJoy;

use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Http\Requests\Circle\CircleNewJoy\UpdateCircleNewJoyRequest;
use App\Support\Arr;
use App\Usecases\CircleManagement\CircleNewJoy\UpdateCircleNewJoyUsecase;
use Illuminate\Support\Facades\Log;

final class UpdateCircleNewJoyController extends Controller
{
    use Permission;

    private UpdateCircleNewJoyUsecase $updateCircleNewJoyUsecase;

    public function __construct(UpdateCircleNewJoyUsecase $updateCircleNewJoyUsecase)
    {
        $this->updateCircleNewJoyUsecase = $updateCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param UpdateCircleNewJoyRequest $request
     * @param int                       $circleId
     * @param int                       $circleNewJoyId
     *
     * @throws \Exception
     *
     * @return array
     */
    public function __invoke(
        UpdateCircleNewJoyRequest $request,
        int $circleId,
        int $circleNewJoyId
    ): array {
        Log::debug('UpdateCircleNewJoyController args', [
            'circleId'       => $circleId,
            'circleNewJoyId' => $circleNewJoyId,
        ]);

        /** @var \App\Models\User */
        $user = $request->user();
        $this->permissionCircle($user, $circleId);

        $param = $request->makeUpdateCircleNewJoyUsecaseParam();

        $this->updateCircleNewJoyUsecase->invoke(
            $param
        );

        return [
            'data' => Arr::camel_keys([]),
        ];
    }
}
