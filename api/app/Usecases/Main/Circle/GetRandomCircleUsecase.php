<?php

namespace App\Usecases\Main\Circle;

use App\Models\Circle;
use App\ValueObjects\CircleValueObject;
use Illuminate\Support\Facades\Log;

class GetRandomCircleUsecase
{
    /**
     * ランダムなサークルを主とくる
     *
     * @return CircleValueObject[]
     */
    public function invoke(int $limit = 6)
    {
        Log::debug("#GetRandomCircleUsecase args", [
            'limit' => $limit
        ]);

        $circles = Circle::with([
            'circleHandbill:circle_id,image_url',
        ])->whereRelease(true)
            // 新歓が登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->select([
                'id', 'name', 'release', 'slug'
            ])
            ->inRandomOrder()
            ->take($limit)
            ->get();

        return $circles->map(
            fn (Circle $circle) =>
            CircleValueObject::byEloquent(
                $circle,
                null,
                $circle->circleHandbill
            )
        );
    }
}
