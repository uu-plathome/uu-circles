<?php

declare(strict_types=1);

namespace App\UseCases\AdminManagement\AllUser;

use App\Models\User;
use App\UseCases\AdminManagement\AllUser\Dto\IndexAllUserDto;
use Illuminate\Support\Facades\Log;

final class IndexAllUserUsecase
{
    /**
     * 管理者ではないアカウント一覧.
     *
     * @return IndexAllUserDto
     */
    public function invoke(): IndexAllUserDto
    {
        Log::debug('IndexAllUserUsecase args none');

        $allUser = User::whereDoesntHave('adminUser')
            ->orderByDesc('updated_at')
            ->get();

        return IndexAllUserDto::byEloquent($allUser);
    }
}
