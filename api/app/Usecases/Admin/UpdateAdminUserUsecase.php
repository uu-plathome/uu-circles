<?php


namespace App\Usecases\Admin;

use App\Enum\Propety\AdminUserPropety;
use App\Enum\UserModel;
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
            UserModel::username     => $adminUserValueObject->username,
            UserModel::display_name => $adminUserValueObject->display_name,
            UserModel::active       => $adminUserValueObject->active,
        ];

        DB::beginTransaction();
        try {
            $user = User::findOrFail($userId);
            $user->update($inputs);
            $user->adminUser->fill([
                AdminUserPropety::role => $adminUserValueObject->role,
            ])->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
