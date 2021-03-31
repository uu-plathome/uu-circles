<?php

namespace App\Usecases\Admin;

use App\Models\User;
use App\ValueObjects\CircleUserValueObject;
use Illuminate\Support\Facades\Log;

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
        Log::debug("IndexCircleUserUsecase args circleId=$circleId");

        $circleUsers = User::with('circleUsers')
            ->whereHas('circleUsers', function ($query) use ($circleId) {
                $query->whereCircleId($circleId);
            })->get();

        return $circleUsers->map(
            fn ($circleUser) => CircleUserValueObject::byEloquent($circleUser)
        )->toArray();
    }
}
