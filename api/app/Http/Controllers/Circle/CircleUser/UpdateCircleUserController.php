<?php

namespace App\Http\Controllers\Circle\CircleUser;

use App\Enum\Property\UserProperty;
use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Http\Requests\Circle\CircleUser\UpdateCircleUserRequest;
use App\Models\User;
use App\Support\Arr;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

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
        $this->permissionCircle($authUser, $circleId);

        /** @var \App\Models\User $user */
        $user = User::whereActive(true)->findOrFail($userId);
        $this->permissionCircle($user, $circleId);

        $request->validate([
            UserProperty::username => 'unique:users,username,' . $user->id
        ]);

        $makeUpdateInput = [
            UserProperty::display_name => $request->get(Str::camel(UserProperty::display_name)),
            UserProperty::username     => $request->get(Str::camel(UserProperty::username)),
        ];

        DB::beginTransaction();
        try {
            $user->update($makeUpdateInput);
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
