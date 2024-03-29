<?php

declare(strict_types=1);

namespace App\UseCases\Main\Circle;

use App\Enum\Property\CircleProperty;
use App\Models\Circle;
use App\UseCases\Main\Circle\Dto\MainSimpleCircleDto;
use App\UseCases\Main\Circle\Dto\MainSimpleCircleListDto;
use Illuminate\Support\Facades\Log;

final class GetCircleWithDemoFixedUsecase
{
    /**
     * デモサークルを含むサークル一覧を取得.
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
            // 公開されているかどうか
            ->whereRelease(true)
            // デモサークルの表示
            ->whereIsDemoFixed(true)
            // 新歓ビラが登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->select([
                CircleProperty::id,
                CircleProperty::name,
                CircleProperty::slug,
                CircleProperty::is_main_fixed,
            ])
            ->take($limit)
            ->get();

        $circles = $foundCircles
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
