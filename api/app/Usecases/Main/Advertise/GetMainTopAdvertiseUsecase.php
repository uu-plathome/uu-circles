<?php

namespace App\Usecases\Main\Advertise;

use App\Enum\AdvertiseType;
use App\Models\Advertise;
use Illuminate\Support\Carbon;

class GetMainTopAdvertiseUsecase
{
    public function invoke()
    {
        $now = Carbon::now();

        $advertises = Advertise::nowPublic($now)
            ->whereAdvertiseType(AdvertiseType::MAIN_TOP)
            ->get()
            ->toArray();

        return $advertises;
    }
}
