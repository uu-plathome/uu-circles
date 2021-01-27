<?php

namespace App\Http\Controllers\Admin\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CircleNewJoy\RegisterCircleNewJoyRequest;
use App\Usecases\Admin\CreateCircleNewJoyUsecase;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
     * @param RegisterCircleNewJoyRequest $request
     * @param int $id
     * @return Response
     * @throws Exception
     */
    public function __invoke(RegisterCircleNewJoyRequest $request, int $id): Response
    {
        $circleNewJoyValueObject = $request->makeCircleNewJoyValueObject();
        $this->createCircleNewJoyUsecase->invoke($id, $circleNewJoyValueObject);
    }
}
