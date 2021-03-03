<?php

namespace App\Usecases\Admin;

use App\Enum\Property\AdminUserProperty;
use App\Enum\Property\UserProperty;
use App\Models\User;
use App\ValueObjects\AdminUserValueObject;
use Exception;
use Illuminate\Support\Facades\DB;

class UpdateAdminUserUsecase
{
    /**
     * @param int $userId
     * @param AdminUserValueObject $adminUserValueObject
     * @throws Exception
     */
    public function invoke(int $userId, AdminUserValueObject $adminUserValueObject)
    {
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
