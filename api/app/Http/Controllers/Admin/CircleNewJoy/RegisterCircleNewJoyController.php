<?php

namespace App\Http\Controllers\Admin\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CircleNewJoy\RegisterCircleNewJoyRequest;
use App\Usecases\Admin\CreateCircleNewJoyUsecase;
use Illuminate\Http\Request;

class RegisterCircleNewJoyController extends Controller
{
    private CreateCircleNewJoyUsecase $createCircleNewJoyUsecase;

    public function __construct(CreateCircleNewJoyUsecase $createCircleNewJoyUsecase)
    {
        $this->createCircleNewJoyUsecase = $createCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(RegisterCircleNewJoyRequest $request, int $id)
    {
        $circleNewJoyValueObject = $request->makeCircleNewJoyValueObject();
        $this->createCircleNewJoyUsecase->invoke($id, $circleNewJoyValueObject);
    }
}
