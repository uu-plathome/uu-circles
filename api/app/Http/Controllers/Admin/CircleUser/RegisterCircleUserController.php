<?php

namespace App\Http\Controllers\Admin\CircleUser;

use App\Enum\Property\UserProperty;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CircleUser\RegisterCircleUserRequest;
use App\Usecases\Admin\CreateCircleUserUsecase;
use Exception;
use Illuminate\Support\Facades\Log;

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
        Log::debug("RegisterCircleUserController args circleId=$circleId");

        $this->createCircleUserUsecase->invoke(
            $circleId,
            $request->makeCircleUserValueObject()
        );
    }
}
