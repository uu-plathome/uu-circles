<?php

declare(strict_types=1);

namespace App\Usecases\Main\Gacha\Dto;

use App\Support\Arr;
use Illuminate\Support\Carbon;

/*
 * pickupリストの戻り値
 */
final class CircleGachaDto
{
    /*
     * ガチャ結果
     */
    public GachaSimpleCircleListDto $result_circles;

    /**
     * ピックアップ
     */
    public GachaSimpleCircleListDto $pickup_circles;

    public string $gacha_hash;
    public int $count;
    public ?Carbon $created_at;

    public function toArray(): array
    {
        return [
            'result_circles' => $this->toArrayResultCircles(),
            'pickup_circles' => $this->toArrayPickupCircles(),
            'gacha_hash'     => $this->gacha_hash,
            'count'          => $this->count,
            'created_at'     => $this->created_at,
        ];
    }

    // ただの配列にする関数
    public function toArrayPickupCircles(): array
    {
        return Arr::get($this->pickup_circles->toArray(), GachaSimpleCircleListDto::LIST);
    }

    // ただの配列にする関数
    public function toArrayResultCircles(): array
    {
        return Arr::get($this->result_circles->toArray(), GachaSimpleCircleListDto::LIST);
    }
}
