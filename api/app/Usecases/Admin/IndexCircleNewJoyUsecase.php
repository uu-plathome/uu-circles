<?php

declare(strict_types=1);

namespace App\Usecases\Admin;

use App\Models\CircleNewJoy;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Support\Facades\Log;

final class IndexCircleNewJoyUsecase
{
    /**
     * invoke
     *
     * @return CircleNewJoyValueObject[]
     */
    public function invoke(int $circleId): array
    {
        Log::debug("IndexCircleNewJoyUsecase args circleId=$circleId");

        $circleNewJoys = CircleNewJoy::whereCircleId($circleId)->get();

        return $circleNewJoys->map(
            fn (CircleNewJoy $circleNewJoy) => CircleNewJoyValueObject::byEloquent($circleNewJoy)
        )->toArray();
    }
}
