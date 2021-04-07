<?php


namespace App\Http\Controllers\Main\Gacha;


use App\Http\Controllers\Controller;
use App\Support\Arr;
use Illuminate\Support\Facades\Log;

class GachaPickupListController  extends Controller
{
    public function __invoke()
    {
        Log::debug('GachaPickupListController args none');
        return Arr::camel_keys([
            "pickupCircle"=> [],
            "pickupDate"=> "2021-4-7",
        ]);
    }
}
