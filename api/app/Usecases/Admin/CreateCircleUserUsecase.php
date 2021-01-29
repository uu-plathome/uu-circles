<?php

namespace App\Usecases\Admin;

use App\Events\RegisteredCircleUser;
use App\Models\Circle;
use App\Models\User;
use App\ValueObjects\CircleUserValueObject;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CreateCircleUserUsecase
{
    /**
     * invoke
     *
     * @param int $circleId
     * @param CircleUserValueObject $circleValueObject
     * @return void
     * @throws Exception
     */
    public function invoke(
        int $circleId,
        CircleUserValueObject $circleValueObject
    ) {
        if (!Circle::whereId($circleId)->exists()) {
            throw new Exception("$circleId のサークルが存在しません");
        }

        $user = new User();
        $user->username = $circleValueObject->username ?? Str::random(12);
        $user->email = $circleValueObject->email;
        $user->active = true;
        $user->display_name ??= $user->username;
        $user->createRememberToken();
        $user->createApiToken();

        DB::beginTransaction();
        try {
            $user->save();
            $user->circleUser()->create([
                'circle_id' => $circleId,
            ]);

            // 認証メールの通知
            event(new RegisteredCircleUser($user));

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
