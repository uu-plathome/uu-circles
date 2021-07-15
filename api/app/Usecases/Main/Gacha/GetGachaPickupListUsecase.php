<?php

declare(strict_types=1);

namespace App\Usecases\Main\Gacha;

use App\Enum\Property\CircleGachaPickupProperty;
use App\Models\Circle;
use App\Models\CircleGachaPickup;
use App\Usecases\Main\Gacha\Dto\GachaPickupListDto;
use App\Usecases\Main\Gacha\Dto\GachaSimpleCircleDto;
use App\Usecases\Main\Gacha\Dto\GachaSimpleCircleListDto;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

final class GetGachaPickupListUsecase
{
    /*
     * pickupする数
     */
    const LIMIT = 3;

    public function invoke(Carbon $date): GachaPickupListDto
    {
        Log::debug('GetGachaPickupListUsecase args none');

        $pickup = CircleGachaPickup::whereDate('created_at', '=', $date->format('Y-m-d'))
            ->first();
        if (!is_null($pickup)) {
            $circles = Circle::with([
                'circleInformation:circle_id,description',
                'circleHandbill:circle_id,image_url',
            ])->whereRelease(true)
                ->whereIsOnlyDemo(false)
                ->whereIn(
                    'id',
                    [
                        $pickup->circle_id1,
                        $pickup->circle_id2,
                        $pickup->circle_id3,
                    ]
                )
                // 新歓が登録されているのものを取得
                ->hasByNonDependentSubquery('circleHandbill')
                ->select([
                    'id', 'name', 'slug',
                ])
                ->get();

            return $this->toGachaSimpleCircleListDto(
                $pickup,
                $circles,
            );
        }

        $circles = Circle::with([
            'circleInformation:circle_id,description',
            'circleHandbill:circle_id,image_url',
        ])->whereRelease(true)
            ->whereIsOnlyDemo(false)
            // 新歓が登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->select([
                'id', 'name', 'slug',
            ])
            ->inRandomOrder()
            ->take(self::LIMIT)
            ->get();

        $circleGachaPickup = new CircleGachaPickup();
        $circleGachaPickup->fill([
            CircleGachaPickupProperty::circle_id1 => $circles[0]->id,
            CircleGachaPickupProperty::circle_id2 => $circles[1]->id,
            CircleGachaPickupProperty::circle_id3 => $circles[2]->id,
        ])->save();

        return $this->toGachaSimpleCircleListDto(
            $circleGachaPickup,
            $circles,
        );
    }

    protected function toGachaSimpleCircleListDto(
        CircleGachaPickup $circleGachaPickup,
        Collection $circles
    ): GachaPickupListDto {
        $dto = new GachaPickupListDto();

        $pickupCirclesDto = new GachaSimpleCircleListDto();

        $pickupCirclesDto->list = $circles->map(
            fn (Circle $circle) =>
                // 型変換
            GachaSimpleCircleDto::byEloquent(
                $circle,
                $circle->circleInformation,
                $circle->circleHandbill
            )
        )->toArray();
        $dto->pickupCircles = $pickupCirclesDto;

        $dto->pickupDate = $circleGachaPickup->created_at->format('Y-m-d');

        return $dto;
    }
}
