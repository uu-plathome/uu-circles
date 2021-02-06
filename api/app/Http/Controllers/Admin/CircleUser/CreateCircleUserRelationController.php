<?php

namespace App\Http\Controllers\Admin\CircleUser;

use App\Models\Circle;
use App\Models\CircleUser;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Illuminate\Validation\ValidationException;

class CreateCircleUserRelationController
{
    /**
     * UserとCircleを紐づける
     *
     * @param Request $request
     * @param int $userId
     * @param int $circleId
     * @throws ValidationException
     * @throws \Exception
     */
    public function __invoke(Request $request, int $userId, int $circleId)
    {
        if (!Circle::exists($circleId)) {
            throw ValidationException::withMessages([
                'data' => '指定されたサークルが存在しません。',
            ]);
        }

        if (!User::exists($circleId)) {
            throw ValidationException::withMessages([
                'data' => '指定されたユーザーが存在しません。',
            ]);
        }

        if (CircleUser::whereUserId($userId)->whereCircleId($circleId)->exists()) {
            throw ValidationException::withMessages([
                'data' => 'すでに連携済みです。',
            ]);
        }

        DB::beginTransaction();
        try {
            (new CircleUser())->fill([
                'circle_id' => $circleId,
                'user_id'   => $userId
            ])->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
