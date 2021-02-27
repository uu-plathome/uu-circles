<?php

namespace App\Usecases;

use App\Enum\Property\AdminUserProperty;
use App\Events\RegisteredAdminUser;
use App\ValueObjects\AdminUserValueObject;
use Exception;
use Illuminate\Support\Facades\DB;

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
        $user = $adminUserValueObject->toUserProperty();
        $user->display_name ??= $user->username;
        if ($user->active === null) {
            $user->active = true;
        }
        $user->createRememberToken();
        $user->createApiToken();

        DB::beginTransaction();
        try {
            $user->save();
            $adminUser = $user->adminUser()->create([
                AdminUserProperty::role => $adminUserValueObject->role,
            ]);

            DB::commit();

            // 認証メールの通知
            event(new RegisteredAdminUser($user));

            return AdminUserValueObject::byEloquent($user, $adminUser);
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
