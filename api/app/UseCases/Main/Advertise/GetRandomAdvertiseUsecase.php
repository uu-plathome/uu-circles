<?php

declare(strict_types=1);

namespace App\UseCases\Main\Advertise;

use App\Enum\AdvertiseType;
use App\Enum\Property\AdvertiseProperty;
use App\Models\Advertise;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

final class GetRandomAdvertiseUsecase
{
    const TTL = 60 * 10;

    public function invoke(int $limit = 2)
    {
        Log::debug('GetRandomAdvertiseUsecase args none');

        $now = Carbon::now();

        $advertises = Advertise::nowPublic($now)
            ->whereAdvertiseType(AdvertiseType::COMMON)
            ->select([
                AdvertiseProperty::title,
                AdvertiseProperty::link,
                AdvertiseProperty::slug,
                AdvertiseProperty::main_image_url,
            ])
            ->inRandomOrder()
            ->take($limit)
            ->get()
            ->toArray();

        return $advertises;
    }

    public static function getCacheKey(): string
    {
        $now = Carbon::now();
        $hour = $now->format('YmdH');
        $minutes_flag = floor($now->minute / 10);

        return 'main.advertise.mainTop'.$hour.$minutes_flag;
    }
}
