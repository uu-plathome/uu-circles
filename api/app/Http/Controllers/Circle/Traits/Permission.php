<?php

namespace App\Http\Controllers\Circle\Traits;

use App\Enum\Role;
use App\Models\CircleUser;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;

trait Permission
{
    public function permissionWithGetUser(User $user)
    {
        if (!$user->circleUsers) {
            throw new AuthorizationException();
        }
    }

    public function permissionCircle(
        User $user,
        int $circleId,
        array $role = [Role::MANAGER, Role::COMMON]
    ) {
        if (!$user->circleUsers) {
            throw new AuthorizationException();
        }

        $circleUser = CircleUser::whereCircleId($circleId)
            ->whereUserId($user->id)
            ->first();
        if (is_null($circleUser)) {
            throw new AuthorizationException();
        }

        if (!in_array($circleUser->role, $role, true)) {
            throw new AuthorizationException();
        }
    }
}
