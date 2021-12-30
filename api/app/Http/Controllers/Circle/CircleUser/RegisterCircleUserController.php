<?php

declare(strict_types=1);

namespace App\Http\Controllers\Circle\CircleUser;

use App\Enum\Role;
use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Http\Requests\Circle\CircleUser\RegisterCircleUserRequest;
use App\UseCases\CircleManagement\CircleUser\CreateCircleUserUsecase;
use Exception;
use Illuminate\Support\Facades\Log;

final class RegisterCircleUserController extends Controller
{
    use Permission;

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

        /** @var \App\Models\User $authUser */
        $authUser = $request->user();
        $this->permissionCircle($authUser, $circleId, [Role::MANAGER]);

        $this->createCircleUserUsecase->invoke(
            $request->makeCreateCircleUserUsecaseParam()
        );
    }
}
