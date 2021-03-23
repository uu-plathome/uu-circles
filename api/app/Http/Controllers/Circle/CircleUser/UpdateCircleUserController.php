<?php

namespace App\Http\Controllers\Circle\CircleUser;

use App\Enum\Property\CircleUserProperty;
use App\Enum\Property\UserProperty;
use App\Enum\Role;
use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Http\Requests\Circle\CircleUser\UpdateCircleUserRequest;
use App\Models\CircleUser;
use App\Models\User;
use App\Support\Arr;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UpdateCircleUserController extends Controller
{
    use Permission;

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function __invoke(UpdateCircleUserRequest $request, int $circleId, int $userId)
    {
        Log::debug("UpdateCircleUserController args", [
            'circleId' => $circleId,
            'userId'   => $userId,
        ]);

        /** @var \App\Models\User $authUser */
        $authUser = $request->user();
        $this->permissionCircle($authUser, $circleId, [Role::MANAGER]);

        /** @var \App\Models\User $user */
        $user = User::whereActive(true)->findOrFail($userId);
        $this->permissionCircle($user, $circleId);

        $circleUser = CircleUser::whereUserId($userId)
            ->whereCircleId($circleId)
            ->firstOrFail();

        $request->validate([
            UserProperty::username   => 'unique:users,username,' . $user->id,
            CircleUserProperty::role => Rule::in(
                $authUser->id === $user->id ? [Role::MANAGER, Role::COMMON] : [Role::MANAGER]
            ),
        ]);

        $makeUpdateInput = [
            UserProperty::display_name => $request->get(Str::camel(UserProperty::display_name)),
            UserProperty::username     => $request->get(Str::camel(UserProperty::username)),
        ];
        $newRole = $request->get(Str::camel(CircleUserProperty::role));

        DB::beginTransaction();
        try {
            $user->update($makeUpdateInput);

            $circleUser->update([
                CircleUserProperty::role => $newRole,
            ]);

            DB::commit();
        } catch (Exception $e) {
            Log::error("[ERROR] UpdateCircleUserController", [
                'value'    => $request->all(),
                'circleId' => $circleId,
                'userId'   => $userId,
            ]);
            DB::rollBack();
            throw $e;
        }

        return [
            'data' => Arr::camel_keys($user->toArray())
        ];
    }
}
