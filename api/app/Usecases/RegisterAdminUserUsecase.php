<?php

namespace App\Usecases;

use App\Models\User;
use App\ValueObjects\AdminUserValueObject;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class RegisterAdminUserUsecase
{
    private CreateAdminUserRepository $createAdminUserRepository;

    private GetAdminUserRepository $getAdminUserRepository;

    /**
     * Create a new usecase instance.
     *
     * @param CreateAdminUserRepository $createAdminUserRepository
     * @param GetAdminUserRepository $getAdminUserRepository
     */
    public function __construct(
        CreateAdminUserRepository $createAdminUserRepository,
        GetAdminUserRepository $getAdminUserRepository
    ) {
        $this->createAdminUserRepository = $createAdminUserRepository;
        $this->getAdminUserRepository = $getAdminUserRepository;
    }

    /**
     * invoke
     *
     * @param AdminUserValueObject $adminUserValueObject
     * @return AdminUserValueObject
     * @throws Exception
     */
    public function invoke(AdminUserValueObject $adminUserValueObject): AdminUserValueObject
    {
        $user = $adminUserValueObject->toUserModel();
        $user->display_name ??= $user->username;
        $user->password = Hash::make($user->password);
        $user->createRememberToken();
        $user->createApiToken();

        DB::beginTransaction();
        try {
            $user->save();
            $user->adminUser()->create();

            DB::commit();

            // 認証メールの通知
            event(new Registered($user));

            return AdminUserValueObject::byEloquent($user);
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
