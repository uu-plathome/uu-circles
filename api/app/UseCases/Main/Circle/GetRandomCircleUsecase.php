<?php

declare(strict_types=1);

namespace App\UseCases\Main\Circle;

use App\Enum\Property\CircleProperty;
use App\Models\Circle;
use App\UseCases\Main\Circle\Dto\MainSimpleCircleDto;
use App\UseCases\Main\Circle\Dto\MainSimpleCircleListDto;
use Illuminate\Support\Facades\Log;

final class GetRandomCircleUsecase
{
    /**
     * ランダムなサークルを取得する.
     * ただし、デモサークルは取得しない.
     *
     * @param int $limit サークル取得数
     *
     * @return MainSimpleCircleListDto
     */
    public function invoke(int $limit = 6): MainSimpleCircleListDto
    {
        Log::debug('#GetRandomCircleUsecase args', [
            'limit' => $limit,
        ]);

        $circles = Circle::with([
            'circleHandbill:circle_id,image_url',
        ])
            // 公開しているサークル
            ->whereRelease(true)
            // デモサークルの非表示
            ->whereIsOnlyDemo(false)
            // 新歓ビラが登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->select([
                CircleProperty::id,
                CircleProperty::name,
                CircleProperty::slug,
            ])
            ->inRandomOrder()
            ->take($limit)
            ->get();

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
