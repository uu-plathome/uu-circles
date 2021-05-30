<?php

declare(strict_types=1);

namespace App\Usecases\Main\Gacha;

use App\Models\Circle;
use App\Usecases\Main\Gacha\Dto\GachaPickupListDto;
use App\ValueObjects\CircleValueObject;
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
                'id', 'name', 'release', 'slug'
            ])
            ->inRandomOrder()
            ->take(self::LIMIT)
            ->get();

        $pickupCircles = $circles->map(
            fn (Circle $circle) =>
            //型変換
            CircleValueObject::byEloquent(
                $circle,
                null,
                $circle->circleHandbill
            )
        )->toArray();

        $dto = new GachaPickupListDto();
        $dto->pickupCircles = $pickupCircles;
        $dto->pickupDate = $pickupDate;

        return $dto;
    }
}
