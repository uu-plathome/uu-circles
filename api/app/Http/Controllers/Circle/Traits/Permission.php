<?php

namespace App\Http\Controllers\Circle\Traits;

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

    public function permissionCircle(User $user, int $circleId)
    {
        if (!$user->circleUsers) {
            throw new AuthorizationException();
        }

        if (CircleUser::whereCircleId($circleId)->whereUserId($user->id)->doesntExist()) {
            throw new AuthorizationException();
        }
    }
}
