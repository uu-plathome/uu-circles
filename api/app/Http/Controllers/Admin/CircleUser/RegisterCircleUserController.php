<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CircleUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CircleUser\RegisterCircleUserRequest;
use App\UseCases\AdminManagement\CircleUser\CreateCircleUserUsecase;
use Exception;
use Illuminate\Support\Facades\Log;

final class RegisterCircleUserController extends Controller
{
    private CreateCircleUserUsecase $createCircleUserUsecase;

    public function __construct(CreateCircleUserUsecase $createCircleUserUsecase)
    {
        $this->createCircleUserUsecase = $createCircleUserUsecase;
    }

    /**
     * @param RegisterCircleUserRequest $request
     * @param int                       $circleId
     *
     * @throws Exception
     */
    public function __invoke(
        RegisterCircleUserRequest $request,
        int $circleId
    ) {
        Log::debug("RegisterCircleUserController args circleId=$circleId");

        $this->createCircleUserUsecase->invoke(
            $request->makeCreateCircleUserUsecaseParam()
        );
    }
}
