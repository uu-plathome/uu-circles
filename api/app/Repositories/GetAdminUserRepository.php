<?php

namespace App\Repositories;

use App\Models\User;

class GetAdminUserRepository
{
    /**
     * invoke
     *
     * @param int $userId
     * @return array
     */
    public function invoke(int $userId): array
    {
        $user = User::findOrFail($userId)->toArray();

        return $user;
    }
}
