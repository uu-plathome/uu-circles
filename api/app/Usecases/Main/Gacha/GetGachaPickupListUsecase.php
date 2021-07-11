<?php

declare(strict_types=1);

namespace App\Usecases\Main\Gacha;

use App\Models\Circle;
use App\Usecases\Main\Gacha\Dto\GachaPickupListDto;
use App\Usecases\Main\Gacha\Dto\GachaSimpleCircleDto;
use App\Usecases\Main\Gacha\Dto\GachaSimpleCircleListDto;
use Illuminate\Support\Facades\Log;

final class GetGachaPickupListUsecase
{
    /*
     * pickupする数
     */
    const LIMIT = 3;

    public function invoke(): GachaPickupListDto
    {
        Log::debug('GetGachaPickupListUsecase args none');

        $pickupDate = GachaPickupListKey::getPickupDate();

        $circles = Circle::with([
            'circleHandbill:circle_id,image_url',
        ])->whereRelease(true)
            // 新歓が登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->select([
                'id', 'name', 'slug',
            ])
            ->inRandomOrder()
            ->take(self::LIMIT)
            ->get();

        $pickupCircles = $circles->map(
            fn (Circle $circle) =>
                // 型変換
            GachaSimpleCircleDto::byEloquent(
                $circle,
                $circle->circleHandbill
            )
        )->toArray();

        $dto = new GachaPickupListDto();

        $pickupCirclesDto = new GachaSimpleCircleListDto();
        $pickupCirclesDto->list = $pickupCircles;
        $dto->pickupCircles = $pickupCirclesDto;

        $dto->pickupDate = $pickupDate;

        return $dto;
    }
}
