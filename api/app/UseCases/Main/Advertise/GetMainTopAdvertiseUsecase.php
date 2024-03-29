<?php

declare(strict_types=1);

namespace App\UseCases\Main\Advertise;

use App\Enum\AdvertiseType;
use App\Enum\Property\AdvertiseProperty;
use App\Models\Advertise;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

final class GetMainTopAdvertiseUsecase
{
    const TTL = 60 * 30;

    public function invoke()
    {
        Log::debug('GetMainTopAdvertiseUsecase args none');

        $now = Carbon::now();

        $advertises = Advertise::nowPublic($now)
            ->whereNotNull(AdvertiseProperty::main_image_url)
            ->whereAdvertiseType(AdvertiseType::MAIN_TOP)
            ->select([
                AdvertiseProperty::title,
                AdvertiseProperty::link,
                AdvertiseProperty::slug,
                AdvertiseProperty::main_image_url,
            ])
            ->get()
            ->toArray();

        return $advertises;
    }

    public static function getCacheKey(): string
    {
        $minutes = Carbon::now()->format('YmdHi');

        return 'GetMainTopAdvertiseUsecase.'.$minutes;
    }
}
