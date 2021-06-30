<?php

declare(strict_types=1);

namespace App\Usecases\Main\Circle;

use App\Enum\Property\CircleProperty;
use App\Models\Circle;
use App\Usecases\Main\Circle\Dto\MainSimpleCircleDto;
use App\Usecases\Main\Circle\Dto\MainSimpleCircleListDto;
use Illuminate\Support\Facades\Log;

final class GetCircleWithDemoFixedUsecase
{
    /**
     * Undocumented function.
     *
     * @param int $limit
     *
     * @return MainSimpleCircleListDto
     */
    public function invoke(int $limit = 12): MainSimpleCircleListDto
    {
        Log::debug('GetCircleWithDemoFixedUsecase args', [
            'limit' => $limit,
        ]);

        $foundCircles = Circle::with([
            'circleHandbill:circle_id,image_url',
        ])
            ->whereRelease(true)
            ->whereIsDemoFixed(true)
            // 新歓が登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->select([
                CircleProperty::id,
                CircleProperty::name,
                CircleProperty::slug,
                CircleProperty::is_main_fixed,
            ])
            ->take($limit)
            ->get();

        $circles = $foundCircles->unique(CircleProperty::id)
            ->sortByDesc(CircleProperty::demo_priority)
            ->values();

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
