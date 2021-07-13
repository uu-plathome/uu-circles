<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\Gacha;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Gacha\GachaPickupListKey;
use App\Usecases\Main\Gacha\GetGachaPickupListUsecase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

final class GachaPickupListController extends Controller
{
    private GetGachaPickupListUsecase $getGachaPickupListUsecase;

    public function __construct(GetGachaPickupListUsecase $getGachaPickupListUsecase)
    {
        $this->getGachaPickupListUsecase = $getGachaPickupListUsecase;
    }

    /*
     * ピックアップ一覧API
     * - ランダムに3つのサークルを取得する。
     * - ピックアップ一覧は1日に1度更新する。
     * - ピックアップ一覧はキャッシュの中に入れておく。
     */
    public function __invoke()
    {
        Log::debug('GachaPickupListController args none');

        $pickupList = Cache::remember(
            GachaPickupListKey::getCacheKey(),
            60 * 60,
            fn () => $this->getGachaPickupListUsecase->invoke(Carbon::today())
        );

        return Arr::camel_keys([
            'pickupCircle' => $pickupList->toArrayPickupCircles(),
            'pickupDate'   => $pickupList->pickupDate,
        ]);
    }
}
