<?php

namespace App\Http\Controllers\Admin\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Http\Requests\Circle\CircleNewJoy\UpdateCircleNewJoyRequest;
use App\Support\Arr;
use App\Usecases\CircleManagement\CircleNewJoy\UpdateCircleNewJoyUsecase;
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
        Log::debug("UpdateCircleNewJoyController args", [
            'circleId'       => $circleId,
            'circleNewJoyId' => $circleNewJoyId,
        ]);

        $param = $request->makeUpdateCircleNewJoyUsecaseParam();

        $this->updateCircleNewJoyUsecase->invoke(
            $param
        );

        return [
            "data" => Arr::camel_keys([])
        ];
    }
}
