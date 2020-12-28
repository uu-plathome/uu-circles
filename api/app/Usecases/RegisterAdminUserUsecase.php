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
        if ($user->active === null) {
            $user->active = true;
        }
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
