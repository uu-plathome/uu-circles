<?php


namespace App\Usecases\Admin;


use App\Enum\UserModel;
use App\Models\User;
use App\ValueObjects\CircleUserValueObject;
use Exception;
use Illuminate\Support\Facades\DB;

class UpdateCircleUserUsecase
{
    /**
     * @param int $userId
     * @param CircleUserValueObject $circleUserValueObject
     * @throws Exception
     */
    public function invoke(int $userId, CircleUserValueObject $circleUserValueObject)
    {
        $inputs = [
            UserModel::username     => $circleUserValueObject->username,
            UserModel::display_name => $circleUserValueObject->display_name,
            UserModel::active       => $circleUserValueObject->active,
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
