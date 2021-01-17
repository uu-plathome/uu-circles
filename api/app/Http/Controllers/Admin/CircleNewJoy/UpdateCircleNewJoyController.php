<?php

namespace App\Http\Controllers\Admin\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CircleNewJoy\UpdateCircleNewJoyRequest;
use App\Support\Arr;
use App\Usecases\Admin\UpdateCircleNewJoyUsecase;
use Illuminate\Http\Request;

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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(
        UpdateCircleNewJoyRequest $request,
        int $id,
        int $circleNewJoyId
    ) {
        $circleNewJoy = $request->makeCircleNewJoyValueObject();
        $this->updateCircleNewJoyUsecase->invoke(
            $id,
            $circleNewJoyId,
            $circleNewJoy
        );

        return [
            "data" => Arr::camel_keys([])
        ];
    }
}
