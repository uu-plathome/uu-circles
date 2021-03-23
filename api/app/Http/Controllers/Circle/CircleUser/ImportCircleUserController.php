<?php

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

class ImportCircleUserController extends Controller
{
    use Permission;

    /**
     * @param ImportCircleUserRequest $request
     * @param int $circleId
     * @throws Exception
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
            Log::error("[ERROR] ImportCircleUserController", [
                'value'    => $request->all(),
                'circleId' => $circleId,
                'userId'   => $userId,
            ]);
            DB::rollBack();
            throw $e;
        }
    }
}
