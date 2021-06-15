<?php

declare(strict_types=1);

namespace App\Usecases\Main\Circle;

use App\Enum\Property\CircleProperty;
use App\Models\Circle;
use App\Usecases\Main\Circle\Dto\MainSimpleCircleDto;
use App\Usecases\Main\Circle\Dto\MainSimpleCircleListDto;
use Illuminate\Support\Facades\Log;

final class GetRandomCircleUsecase
{
    /**
     * ランダムなサークルを取得する.
     *
     * @param int $limit
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
        ])->whereRelease(true)
            // 新歓が登録されているのものを取得
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
