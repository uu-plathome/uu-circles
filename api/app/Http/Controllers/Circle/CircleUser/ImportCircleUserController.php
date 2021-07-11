<?php

declare(strict_types=1);

namespace App\Http\Controllers\Circle\CircleUser;

use App\Enum\Property\CircleUserProperty;
use App\Enum\Role;
use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Http\Requests\Circle\CircleUser\ImportCircleUserRequest;
use App\Models\CircleUser;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

final class ImportCircleUserController extends Controller
{
    use Permission;

    /**
     * 既存部員アカウントをサークルと連携させる.
     *
     * @param ImportCircleUserRequest $request
     * @param int                     $circleId
     * @param int                     $userId
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function __invoke(
        ImportCircleUserRequest $request,
        int $circleId,
        int $userId
    ) {
        Log::debug("ImportCircleUserController args circleId=$circleId, userId=$userId");

        /** @var \App\Models\User $authUser */
        $authUser = $request->user();
        $this->permissionCircle($authUser, $circleId, [Role::MANAGER]);

        $user = User::whereActive(true)
            ->findOrFail($userId);

        if (
            CircleUser::whereUserId($userId)
            ->whereCircleId($circleId)
            ->exists()
        ) {
            ValidationException::withMessages([
                'id' => 'すでに部員アカウントはサークルと連携しています。',
            ]);
        }

        DB::beginTransaction();

        try {
            $user->circleUsers()
                ->create([
                    CircleUserProperty::circle_id => $circleId,
                    CircleUserProperty::role      => $request->get(CircleUserProperty::role),
                ]);

            DB::commit();
        } catch (Exception $e) {
            Log::error('[ERROR] ImportCircleUserController', [
                'value'    => $request->all(),
                'circleId' => $circleId,
                'userId'   => $userId,
            ]);
            DB::rollBack();

            throw $e;
        }
    }
}
