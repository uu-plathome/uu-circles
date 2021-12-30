<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\DemoCircleNewJoy;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\DemoCircleNewJoy\UpdateDemoCircleNewJoyRequest;
use App\Support\Arr;
use App\UseCases\AdminManagement\DemoCircleNewJoy\UpdateDemoCircleNewJoyUsecase;

final class UpdateDemoCircleNewJoyController extends Controller
{
    private UpdateDemoCircleNewJoyUsecase $updateDemoCircleNewJoyUsecase;

    public function __construct(UpdateDemoCircleNewJoyUsecase $updateDemoCircleNewJoyUsecase)
    {
        $this->updateDemoCircleNewJoyUsecase = $updateDemoCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param UpdateDemoCircleNewJoyRequest $request
     * @param int                           $circleId
     * @param int                           $circleNewJoyId
     *
     * @throws \Exception
     *
     * @return array
     */
    public function __invoke(
        UpdateDemoCircleNewJoyRequest $request,
        int $demoCircleNewJoyId
    ): array {
        $param = $request->makeUpdateDemoCircleNewJoyUsecaseParam();

        $this->updateDemoCircleNewJoyUsecase->invoke($param);

        return [
            'data' => Arr::camel_keys([]),
        ];
    }
}
