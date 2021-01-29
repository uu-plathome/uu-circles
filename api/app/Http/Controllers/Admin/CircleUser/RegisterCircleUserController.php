<?php

namespace App\Http\Controllers\Admin\CircleUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CircleUser\RegisterCircleUserRequest;
use App\Usecases\Admin\CreateCircleUserUsecase;
use Exception;

class RegisterCircleUserController extends Controller
{
    private CreateCircleUserUsecase $createCircleUserUsecase;

    public function __construct(CreateCircleUserUsecase $createCircleUserUsecase)
    {
        $this->createCircleUserUsecase = $createCircleUserUsecase;
    }

    /**
     * @param RegisterCircleUserRequest $request
     * @param int $circleId
     * @throws Exception
     */
    public function __invoke(
        RegisterCircleUserRequest $request,
        int $circleId
    ) {
        $this->createCircleUserUsecase->invoke(
            $circleId,
            $request->makeCircleUserValueObject()
        );
    }
}
