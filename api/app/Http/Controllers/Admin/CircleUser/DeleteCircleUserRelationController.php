<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CircleUser;

use App\Models\Circle;
use App\Models\CircleUser;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Illuminate\Validation\ValidationException;

final class DeleteCircleUserRelationController
{
    /**
     * CircleとUserの連携を解除する
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

        $circleUser = CircleUser::whereUserId($userId)->whereCircleId($circleId);
        if (!$circleUser->exists()) {
            throw ValidationException::withMessages([
                'data' => 'ユーザーとサークルに連携が存在しません。',
            ]);
        }

        DB::beginTransaction();
        try {
            $circleUser->delete();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
