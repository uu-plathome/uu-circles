<?php

declare(strict_types=1);

namespace App\Usecases\AdminManagement\AdminUser;

use App\Enum\Property\AdminUserProperty;
use App\Events\RegisteredAdminUser;
use App\ValueObjects\AdminUserValueObject;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class RegisterAdminUserUsecase
{
    /**
     * 管理者アカウントのユーザー情報の新規作成.
     *
     * @param AdminUserValueObject $adminUserValueObject
     *
     * @throws Exception
     *
     * @return AdminUserValueObject
     */
    public function invoke(AdminUserValueObject $adminUserValueObject): AdminUserValueObject
    {
        Log::debug('RegisterAdminUserUsecase args', [
            'adminUserValueObject' => $adminUserValueObject,
        ]);

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
