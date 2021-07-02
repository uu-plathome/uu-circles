<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\DemoCircleNewJoy;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\DemoCircleNewJoy\RegisterDemoCircleNewJoyRequest;
use App\Support\Arr;
use App\Usecases\Admin\DemoCircleNewJoy\CreateDemoCircleNewJoyUsecase;
use Exception;

final class RegisterDemoCircleNewJoyController extends Controller
{
    private CreateDemoCircleNewJoyUsecase $createDemoCircleNewJoyUsecase;

    public function __construct(CreateDemoCircleNewJoyUsecase $createDemoCircleNewJoyUsecase)
    {
        $this->createDemoCircleNewJoyUsecase = $createDemoCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param RegisterDemoCircleNewJoyRequest $request
     * @param int                             $circleId
     *
     * @throws Exception
     *
     * @return array
     */
    public function __invoke(RegisterDemoCircleNewJoyRequest $request, int $circleId): array
    {
        $param = $request->makeCreateDemoCircleNewJoyUsecaseParam();
        $this->createDemoCircleNewJoyUsecase->invoke($param);

        return [
            'data' => Arr::camel_keys([]),
        ];
    }
}
