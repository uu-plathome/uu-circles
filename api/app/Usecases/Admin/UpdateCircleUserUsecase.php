<?php


namespace App\Usecases\Admin;


use App\Enum\Property\UserProperty;
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
            UserProperty::username     => $circleUserValueObject->username,
            UserProperty::display_name => $circleUserValueObject->display_name,
            UserProperty::active       => $circleUserValueObject->active,
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
