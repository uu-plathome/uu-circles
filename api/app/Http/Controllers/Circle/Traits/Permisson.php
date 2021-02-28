<?php

namespace App\Http\Requests\Circle\Traits;

use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;

trait Permission
{
    public function permissionWithGetUser(User $user)
    {
        if (!$user->circleUser) {
            throw new AuthorizationException();
        }
    }
}
