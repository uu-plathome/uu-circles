<?php


namespace App\Http\Controllers\Main\Gacha;


use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Gacha\GetGachaPickupListUsecase;
use Illuminate\Support\Facades\Log;

class GachaPickupListController  extends Controller
{
    private GetGachaPickupListUsecase $getGachaPickupListUsecase;

    public function  __construct(GetGachaPickupListUsecase $getGachaPickupListUsecase)
    {
        $this->getGachaPickupListUsecase = $getGachaPickupListUsecase;
    }

    public function __invoke()
    {
        Log::debug('GachaPickupListController args none');

        $pickupList = $this->getGachaPickupListUsecase->invoke();

        return Arr::camel_keys([
            "pickupCircle"=> $pickupList->toArrayPickupCircles(),
            "pickupDate"=> $pickupList->pickupDate,
        ]);
    }
}
