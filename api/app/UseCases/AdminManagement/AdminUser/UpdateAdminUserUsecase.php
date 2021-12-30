<?php

declare(strict_types=1);

namespace App\Usecases\AdminManagement\AdminUser;

use App\Enum\Property\AdminUserProperty;
use App\Enum\Property\UserProperty;
use App\Models\User;
use App\ValueObjects\AdminUserValueObject;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class UpdateAdminUserUsecase
{
    /**
     * 管理者アカウントのユーザー情報更新.
     *
     * @param int                  $userId
     * @param AdminUserValueObject $adminUserValueObject
     *
     * @throws Exception
     */
    public function invoke(int $userId, AdminUserValueObject $adminUserValueObject)
    {
        Log::debug('UpdateAdminUserUsecase args', [
            'userId'               => $userId,
            'adminUserValueObject' => $adminUserValueObject,
        ]);

        $inputs = [
            UserProperty::username     => $adminUserValueObject->username,
            UserProperty::display_name => $adminUserValueObject->display_name,
            UserProperty::active       => $adminUserValueObject->active,
        ];

        DB::beginTransaction();

        try {
            $user = User::findOrFail($userId);
            $user->update($inputs);
            $user->adminUser->fill([
                AdminUserProperty::role => $adminUserValueObject->role,
            ])->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }
    }
}
