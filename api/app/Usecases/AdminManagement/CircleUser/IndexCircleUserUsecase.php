<?php

declare(strict_types=1);

namespace App\Usecases\Admin\CircleUser;

use App\Models\User;
use App\ValueObjects\CircleUserValueObject;
use Illuminate\Support\Facades\Log;

final class IndexCircleUserUsecase
{
    /**
     * invoke.
     *
     * @param int $circleId
     *
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
