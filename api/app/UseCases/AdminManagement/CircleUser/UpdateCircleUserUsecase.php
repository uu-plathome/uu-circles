<?php

declare(strict_types=1);

namespace App\UseCases\AdminManagement\CircleUser;

use App\Enum\Property\CircleUserProperty;
use App\Enum\Property\UserProperty;
use App\Models\CircleUser;
use App\Models\User;
use App\UseCases\AdminManagement\CircleUser\Params\UpdateCircleUserUsecaseParam;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class UpdateCircleUserUsecase
{
    /**
     * @param UpdateCircleUserUsecaseParam $param
     *
     * @throws Exception
     */
    public function invoke(
        UpdateCircleUserUsecaseParam $param
    ) {
        Log::debug('UpdateCircleUserUsecase args', [
            'UpdateCircleUserUsecaseParam' => $param,
        ]);

        $inputs = [
            UserProperty::username     => $param->username,
            UserProperty::display_name => $param->display_name,
            UserProperty::active       => $param->active,
        ];

        DB::beginTransaction();

        try {
            User::findOrFail($param->user_id)
                ->update($inputs);

            CircleUser::whereUserId($param->user_id)
                ->whereCircleId($param->circle_id)
                ->update([
                    CircleUserProperty::role => $param->role,
                ]);

            DB::commit();
        } catch (Exception $e) {
            Log::error('UpdateCircleUserUsecase [ERROR]', [
                'UpdateCircleUserUsecaseParam' => $param,
            ]);

            DB::rollBack();

            throw $e;
        }
    }
}
