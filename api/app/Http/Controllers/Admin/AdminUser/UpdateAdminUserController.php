<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\AdminUser;

use App\Enum\Property\AdminUserProperty;
use App\Enum\Property\UserProperty;
use App\Enum\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminUser\UpdateAdminUserRequest;
use App\UseCases\AdminManagement\AdminUser\UpdateAdminUserUsecase;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

final class UpdateAdminUserController extends Controller
{
    private UpdateAdminUserUsecase $updateAdminUserUsecase;

    public function __construct(UpdateAdminUserUsecase $updateAdminUserUsecase)
    {
        $this->updateAdminUserUsecase = $updateAdminUserUsecase;
    }

    /**
     * @param UpdateAdminUserRequest $request
     * @param int                    $userId
     *
     * @throws Exception
     */
    public function __invoke(UpdateAdminUserRequest $request, int $userId)
    {
        Log::debug("UpdateAdminUserController args userId=$userId");

        $request->validate([
            UserProperty::username  => 'unique:users,username,'.$userId,
            AdminUserProperty::role => [Rule::in($this->canSelectedRoles($request->user()))],
        ]);

        $this->updateAdminUserUsecase->invoke(
            $userId,
            $request->makeAdminUserValueObject()
        );
    }

    private function canSelectedRoles($user): array
    {
        return $user->adminUser->isSystem()
            ? [Role::SYSTEM, Role::MANAGER, Role::COMMON]
            : [Role::MANAGER, Role::COMMON];
    }
}
