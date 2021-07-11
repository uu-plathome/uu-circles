<?php

declare(strict_types=1);

namespace App\Usecases\Main\Advertise;

use App\Enum\AdvertiseType;
use App\Enum\Property\AdvertiseProperty;
use App\Models\Advertise;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

final class GetMainTopAdvertiseUsecase
{
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
}
