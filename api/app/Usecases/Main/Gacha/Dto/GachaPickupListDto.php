<?php

declare(strict_types=1);

namespace App\Usecases\Main\Gacha\Dto;

use App\Support\Arr;
use App\ValueObjects\CircleValueObject;
use Illuminate\Support\Collection;

/*
 * pickupリストの戻り値
 */
final class GachaPickupListDto
{
    /*
     * @var \App\ValueObjects\CircleValueObject[]
     * CircleValueObjectの配列（クラスの配列）
     */
    public array $pickupCircles;
    public string $pickupDate;

    //ただの配列にする関数
    public function toArrayPickupCircles(): array
    {
        return (new Collection($this->pickupCircles))->map(
            fn (CircleValueObject $circleValueObject) =>
            Arr::only($circleValueObject->toArray(), [
                'id', 'name', 'handbill_image_url', 'slug'
            ])
        )->toArray();
    }
}
