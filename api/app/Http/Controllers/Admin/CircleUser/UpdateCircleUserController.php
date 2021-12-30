<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CircleUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CircleUser\UpdateCircleUserRequest;
use App\UseCases\AdminManagement\CircleUser\UpdateCircleUserUsecase;
use Illuminate\Support\Facades\Log;

final class UpdateCircleUserController extends Controller
{
    private UpdateCircleUserUsecase $updateCircleUserUsecase;

    public function __construct(UpdateCircleUserUsecase $updateCircleUserUsecase)
    {
        $this->updateCircleUserUsecase = $updateCircleUserUsecase;
    }

    public function __invoke(UpdateCircleUserRequest $request, int $circleId, int $userId)
    {
        Log::debug("RegisterCircleUserController args circleId=$circleId, userId=$userId");

        $this->updateCircleUserUsecase->invoke(
            $request->makeUpdateCircleUserUsecaseParam()
        );
    }
}
