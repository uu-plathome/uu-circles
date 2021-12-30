<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CircleNewJoy\RegisterCircleNewJoyRequest;
use App\Support\Arr;
use App\Usecases\AdminManagement\CircleNewJoy\CreateCircleNewJoyUsecase;
use Exception;
use Illuminate\Http\Response;

final class RegisterCircleNewJoyController extends Controller
{
    private CreateCircleNewJoyUsecase $createCircleNewJoyUsecase;

    public function __construct(CreateCircleNewJoyUsecase $createCircleNewJoyUsecase)
    {
        $this->createCircleNewJoyUsecase = $createCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param RegisterCircleNewJoyRequest $request
     * @param int                         $circleId
     *
     * @throws Exception
     *
     * @return Response
     */
    public function __invoke(RegisterCircleNewJoyRequest $request, int $circleId)
    {
        $param = $request->makeCreateCircleNewJoyUsecaseParam();
        $this->createCircleNewJoyUsecase->invoke($param);

        return [
            'data' => Arr::camel_keys([]),
        ];
    }
}
