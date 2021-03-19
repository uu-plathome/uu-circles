<?php

namespace App\Usecases\Admin;

use App\Models\User;
use App\ValueObjects\CircleUserValueObject;

class IndexCircleUserUsecase
{
    /**
     * invoke
     *
     * @param int $circleId
     * @return array
     */
    public function invoke(int $circleId): array
    {
        $circleUsers = User::with('circleUsers')
            ->whereHas('circleUsers', function ($query) use ($circleId) {
                $query->whereCircleId($circleId);
            })->get();

        return $circleUsers->map(
            fn ($circleUser) => CircleUserValueObject::byEloquent($circleUser)
        )->toArray();
    }
}
