<?php

namespace App\Usecases\Admin;

use App\Models\User;
use App\ValueObjects\AdminUserValueObject;

class IndexAdminUserUsecase
{
    /**
     * invoke
     *
     * @return AdminUserValueObject[]
     */
    public function invoke(): array
    {
        $users = User::whereAdminUser()->get();

        return $users->map(fn (User $user) =>
            AdminUserValueObject::byEloquent($user)
        )->all();
    }
}
