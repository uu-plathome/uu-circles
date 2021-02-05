<?php

namespace App\Http\Controllers\Admin\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CircleNewJoy\UpdateCircleNewJoyRequest;
use App\Support\Arr;
use App\Usecases\Admin\UpdateCircleNewJoyUsecase;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class UpdateCircleNewJoyController extends Controller
{
    private UpdateCircleNewJoyUsecase $updateCircleNewJoyUsecase;

    public function __construct(UpdateCircleNewJoyUsecase $updateCircleNewJoyUsecase)
    {
        $this->updateCircleNewJoyUsecase = $updateCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param UpdateCircleNewJoyRequest $request
     * @param int $circleId
     * @param int $circleNewJoyId
     * @return array
     * @throws \Exception
     */
    public function __invoke(
        UpdateCircleNewJoyRequest $request,
        int $circleId,
        int $circleNewJoyId
    ): array {
        $circleNewJoy = $request->makeCircleNewJoyValueObject();

        $this->updateCircleNewJoyUsecase->invoke(
            $circleId,
            $circleNewJoyId,
            $circleNewJoy
        );

        return [
            "data" => Arr::camel_keys([])
        ];
    }
}
