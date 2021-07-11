<?php

declare(strict_types=1);

namespace App\Usecases\Main\Gacha\Dto;

/*
 * pickupリストの戻り値
 */
final class GachaPickupListDto
{
    /*
     * CircleValueObjectの配列（クラスの配列）
     */
    public GachaSimpleCircleListDto $pickupCircles;
    public string $pickupDate;

    //ただの配列にする関数
    public function toArrayPickupCircles(): array
    {
        return $this->pickupCircles->toArray();
    }
}
