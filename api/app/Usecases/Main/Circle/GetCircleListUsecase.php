<?php

namespace App\Usecases\Main\Circle;

use App\Models\Circle;
use App\ValueObjects\CircleValueObject;

class GetCircleListUsecase
{
    /**
     * サークルを主とくる
     *
     * @return CircleValueObject[]
     */
    public function invoke()
    {
        $circles = Circle::with([
            'circleInformation:circle_id,name',
            'circleHandbill:circle_id,image_url',
        ])->whereRelease(true)
            // 新歓が登録されているのものを取得
            ->whereHas('circleHandbill')
            ->select([
                'id', 'release', 'slug'
            ])
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
