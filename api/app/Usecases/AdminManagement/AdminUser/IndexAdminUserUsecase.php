<?php

declare(strict_types=1);

namespace App\Usecases\AdminManagement\AdminUser;

use App\Enum\Role;
use App\Models\User;
use App\ValueObjects\AdminUserValueObject;
use Exception;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Log;

final class IndexAdminUserUsecase
{
    /**
     * 管理者アカウント一覧の取得.
     *
     * @throws Exception
     *
     * @return AdminUserValueObject[]
     */
    public function invoke(string $ownRole = Role::MANAGER): array
    {
        Log::debug("IndexAdminUserUsecase args ownRole=$ownRole");

        if ($ownRole === Role::COMMON) {
            throw new Exception("この権限では、管理者アカウント一覧は取得できません。 ownRole=$ownRole");
        }

        // 通常の取得したいRole
        $wantRole = [Role::COMMON, Role::MANAGER];
        // システム管理者のとき、システム管理者も取得
        if ($ownRole === Role::SYSTEM) {
            $wantRole[] = Role::SYSTEM;
        }

        $users = User::with('adminUser')
            ->hasByNonDependentSubquery('adminUser', function (HasOne $query) use ($wantRole) {
                /** @var \App\Models\AdminUser $query */
                $query->when(count($wantRole) == 2, function ($query) {
                    $query->whereIn('role', [Role::COMMON, Role::MANAGER]);
                });
            })
            ->get();

        return $users->map(
            fn (User $user) => AdminUserValueObject::byEloquent($user, $user->adminUser)
        )->all();
    }
}
