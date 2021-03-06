<?php

namespace App\Usecases\Main\Circle;

use App\Enum\Property\CircleProperty;
use App\Models\Circle;
use App\ValueObjects\CircleValueObject;
use Illuminate\Support\Facades\Log;

class GetRandomCircleWithMainFixedUsecase
{
    public function invoke(int $limit = 12)
    {
        Log::debug("#GetRandomCircleWithMainFixedUsecase args", [
            'limit' => $limit
        ]);

        $fixedCircles = Circle::with([
            'circleHandbill:circle_id,image_url',
        ])->whereRelease(true)
            ->whereIsMainFixed(true)
            // 新歓が登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->select([
                CircleProperty::id,
                CircleProperty::name,
                CircleProperty::release,
                CircleProperty::slug,
                CircleProperty::is_main_fixed,
            ])
            ->inRandomOrder()
            ->take($limit);

        /** @var Circle $foundCircles */
        $foundCircles = Circle::with([
            'circleHandbill:circle_id,image_url',
        ])->whereRelease(true)
            ->whereIsMainFixed(false)
            // 新歓が登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->select([
                CircleProperty::id,
                CircleProperty::name,
                CircleProperty::release,
                CircleProperty::slug,
                CircleProperty::is_main_fixed,
            ])
            ->inRandomOrder()
            ->take($limit)
            ->union($fixedCircles)
            ->get();

        $circles = $foundCircles->unique('id')
            ->sortByDesc(CircleProperty::is_main_fixed)
            ->values()
            ->take($limit)
            ->shuffle();

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
