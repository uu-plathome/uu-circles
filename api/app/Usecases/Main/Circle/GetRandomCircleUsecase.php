<?php

namespace App\Usecases\Main\Circle;

use App\Models\Circle;
use App\ValueObjects\CircleValueObject;

class GetRandomCircleUsecase
{
    /**
     * ランダムなサークルを主とくる
     *
     * @return CircleValueObject[]
     */
    public function invoke(int $limit = 6)
    {
        $circles = Circle::with([
            'circleInformation',
            'circleHandbill',
        ])->whereRelease(true)
            ->inRandomOrder()
            ->take($limit)
            ->get();

        return $circles->map(
            fn (Circle $circle) =>
            CircleValueObject::byEloquent(
                $circle,
                $circle->circleInformation,
                $circle->circleHandbill
            )
        );
    }
}
