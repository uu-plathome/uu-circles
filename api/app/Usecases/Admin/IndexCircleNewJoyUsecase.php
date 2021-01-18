<?php

namespace App\Usecases\Admin;

use App\Models\CircleNewJoy;
use App\ValueObjects\CircleNewJoyValueObject;

class IndexCircleNewJoyUsecase
{
    /**
     * invoke
     *
     * @return CircleNewJoyValueObject[]
     */
    public function invoke(int $circleId): array
    {
        $circleNewJoys = CircleNewJoy::whereCircleId($circleId)->get();

        return $circleNewJoys->map(
            fn (CircleNewJoy $circleNewJoy) => CircleNewJoyValueObject::byEloquent($circleNewJoy)
        )->toArray();
    }
}
