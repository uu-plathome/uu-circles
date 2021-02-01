<?php


namespace App\Usecases\Admin;


use App\Enum\UserModel;
use App\Models\User;
use App\ValueObjects\AdminUserValueObject;
use App\ValueObjects\CircleUserValueObject;
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
            User::findOrFail($userId)->update($inputs);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
