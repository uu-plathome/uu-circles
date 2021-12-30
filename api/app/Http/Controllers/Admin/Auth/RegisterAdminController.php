<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Auth;

use App\Enum\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\RegisterAdminFormRequest;
use App\Support\Arr;
use App\Usecases\AdminManagement\AdminUser\RegisterAdminUserUsecase;
use Exception;
use Illuminate\Validation\Rule;

final class RegisterAdminController extends Controller
{
    private RegisterAdminUserUsecase $registerAdminUserUsecase;

    public function __construct(
        RegisterAdminUserUsecase $registerAdminUserUsecase
    ) {
        $this->registerAdminUserUsecase = $registerAdminUserUsecase;
    }

    /**
     * @param RegisterAdminFormRequest $request
     *
     * @throws Exception
     *
     * @return array
     */
    public function __invoke(RegisterAdminFormRequest $request): array
    {
        $request->validate([
            'role' => [Rule::in($this->canSelectedRoles($request->user()))],
        ]);

        $user = $this->registerAdminUserUsecase->invoke(
            $request->makeAdminUserValueObject()
        );

        return Arr::camel_keys([
            'data'   => $user->toArray(true),
            'status' => __('verification.sent'),
        ]);
    }

    private function canSelectedRoles($user): array
    {
        return $user->adminUser->isSystem() ? [Role::SYSTEM, Role::MANAGER, Role::COMMON] : [Role::MANAGER, Role::COMMON];
    }
}
