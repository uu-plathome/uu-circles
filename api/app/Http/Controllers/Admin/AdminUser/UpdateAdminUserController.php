<?php

namespace App\Http\Controllers\Admin\AdminUser;

use App\Enum\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminUser\UpdateAdminUserRequest;
use App\Usecases\Admin\UpdateAdminUserUsecase;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

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
        $request->validate([
            'role' => [Rule::in($this->canSelectedRoles($request->user()))]
        ]);

        $this->updateAdminUserUsecase->invoke(
            $userId,
            $request->makeAdminUserValueObject()
        );
    }

    private function canSelectedRoles($user): array
    {
        return $user->adminUser->isSystem() ? [Role::SYSTEM, Role::MANAGER, Role::COMMON] : [Role::MANAGER, Role::COMMON];
    }
}
