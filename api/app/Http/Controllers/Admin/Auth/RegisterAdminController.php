<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Enum\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\RegisterAdminFormRequest;
use App\Support\Arr;
use App\Usecases\RegisterAdminUserUsecase;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class RegisterAdminController extends Controller
{
    private RegisterAdminUserUsecase $registerAdminUserUsecase;

    public function __construct(
        RegisterAdminUserUsecase $registerAdminUserUsecase
    ) {
        $this->registerAdminUserUsecase = $registerAdminUserUsecase;
    }

    /**
     * @param RegisterAdminFormRequest $request
     * @return array
     * @throws Exception
     */
    public function __invoke(RegisterAdminFormRequest $request): array
    {
        $request->validate([
            'role' => [Rule::in($this->canSelectedRoles($request->user()))]
        ]);

        $user = $this->registerAdminUserUsecase->invoke(
            $request->makeAdminUserValueObject()
        );

        return Arr::camel_keys([
            'data'   => $user->toArray(true),
            'status' => __('verification.sent')
        ]);
    }

    private function canSelectedRoles($user): array
    {
        return $user->adminUser->isSystem() ? [Role::SYSTEM, Role::MANAGER, Role::COMMON] : [Role::MANAGER, Role::COMMON];
    }
}
