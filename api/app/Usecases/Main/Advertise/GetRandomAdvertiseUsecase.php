<?php

namespace App\Usecases\Main\Advertise;

use App\Enum\AdvertiseType;
use App\Models\Advertise;
use Illuminate\Support\Carbon;

class GetRandomAdvertiseUsecase
{
    public function invoke(int $limit = 2)
    {
        $now = Carbon::now();

        $advertises = Advertise::nowPublic($now)
            ->whereAdvertiseType(AdvertiseType::COMMON)
            ->inRandomOrder()
            ->take($limit)
            ->get()
            ->toArray();

        return $advertises;
    }
}
