<?php

namespace App\Usecases\CircleManagement\CircleNewJoy;

use App\Models\CircleNewJoy;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Support\Facades\Log;

class IndexCircleNewJoyUsecase
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
