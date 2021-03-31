<?php

namespace App\Usecases\Main\Advertise;

use App\Enum\AdvertiseType;
use App\Enum\Property\AdvertiseProperty;
use App\Models\Advertise;
use Illuminate\Support\Carbon;

class GetMainTopAdvertiseUsecase
{
    public function invoke()
    {
        $now = Carbon::now();

        $advertises = Advertise::nowPublic($now)
            ->whereNotNull(AdvertiseProperty::main_image_url)
            ->whereAdvertiseType(AdvertiseType::MAIN_TOP)
            ->get()
            ->toArray();

        return $advertises;
    }
}
