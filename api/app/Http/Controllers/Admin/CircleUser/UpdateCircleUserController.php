<?php

namespace App\Http\Controllers\Admin\CircleUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CircleUser\UpdateCircleUserRequest;
use App\Usecases\Admin\UpdateCircleUserUsecase;
use Illuminate\Http\Request;

class UpdateCircleUserController extends Controller
{
    private UpdateCircleUserUsecase $updateCircleUserUsecase;

    public function __construct(UpdateCircleUserUsecase $updateCircleUserUsecase)
    {
        $this->updateCircleUserUsecase = $updateCircleUserUsecase;
    }

    public function __invoke(UpdateCircleUserRequest $request, int $circleId, int $userId)
    {
        $this->updateCircleUserUsecase->invoke(
            $userId,
            $request->makeCircleUserValueObject()
        );
    }
}
