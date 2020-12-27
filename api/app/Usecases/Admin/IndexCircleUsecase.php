<?php

namespace App\Usecases\Admin;

use App\Models\Circle;
use App\ValueObjects\CircleValueObject;

class IndexCircleUsecase
{
    /**
     * invoke
     *
     * @return CircleValueObject[]
     */
    public function invoke(): array
    {
        $circles = Circle::with('circleInformation')->whereHas('circleInformation')->get();

        return $circles->map(fn (Circle $circle) =>
            CircleValueObject::byEloquent(
                $circle,
                $circle->circleInformation
            )
        )->all();
    }
}
