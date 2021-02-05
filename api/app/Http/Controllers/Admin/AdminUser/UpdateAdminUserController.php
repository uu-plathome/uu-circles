<?php

namespace App\Http\Controllers\Admin\AdminUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminUser\UpdateAdminUserRequest;
use App\Usecases\Admin\UpdateAdminUserUsecase;
use Exception;

class UpdateAdminUserController extends Controller
{
    private UpdateAdminUserUsecase $updateAdminUserUsecase;

    public function __construct(UpdateAdminUserUsecase $updateAdminUserUsecase)
    {
        $this->updateAdminUserUsecase = $updateAdminUserUsecase;
    }

    /**
     * @param UpdateAdminUserRequest $request
     * @param int $userId
     * @throws Exception
     */
    public function __invoke(UpdateAdminUserRequest $request, int $userId)
    {
        $this->updateAdminUserUsecase->invoke(
            $userId,
            $request->makeAdminUserValueObject()
        );
    }
}
