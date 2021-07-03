<?php

declare(strict_types=1);

namespace App\Usecases\Main\Circle;

use App\Enum\Property\CircleProperty;
use App\Models\Circle;
use App\Usecases\Main\Circle\Dto\MainSimpleCircleDto;
use App\Usecases\Main\Circle\Dto\MainSimpleCircleListDto;
use Illuminate\Support\Facades\Log;

final class GetRandomCircleWithMainFixedUsecase
{
    /**
     * メイン画面に固定するサークルをランダムに取得
     * デモのサークルは取得しない
     *
     * @param int $limit
     *
     * @return MainSimpleCircleListDto
     */
    public function invoke(int $limit = 12): MainSimpleCircleListDto
    {
        Log::debug('#GetRandomCircleWithMainFixedUsecase args', [
            'limit' => $limit,
        ]);

        $fixedCircles = Circle::with([
            'circleHandbill:circle_id,image_url',
        ])
            ->whereRelease(true)
            ->whereIsOnlyDemo(false)
            ->whereIsMainFixed(true)
            // 新歓が登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->select([
                CircleProperty::id,
                CircleProperty::name,
                CircleProperty::slug,
                CircleProperty::is_main_fixed,
            ])
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
                CircleProperty::slug,
                CircleProperty::is_main_fixed,
            ])
            ->inRandomOrder()
            ->take($limit)
            ->union($fixedCircles)
            ->get();

        $circles = $foundCircles->unique(CircleProperty::id)
            ->sortByDesc(CircleProperty::is_main_fixed)
            ->values()
            ->take($limit)
            ->shuffle();

        $dto = new MainSimpleCircleListDto();
        $dto->list = $circles->map(
            fn (Circle $circle) => MainSimpleCircleDto::byEloquent(
                $circle,
                $circle->circleHandbill
            )
        )->toArray();

        return $dto;
    }
}
