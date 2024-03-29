<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Advertise;

use App\Enum\Property\AdvertiseCounterProperty;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Advertise\UpdateAdvertiseRequest;
use App\Models\Advertise;
use App\Models\AdvertiseCounter;
use App\UseCases\Main\Advertise\GetMainTopAdvertiseUsecase;
use App\UseCases\Main\Advertise\GetRandomAdvertiseUsecase;
use Exception;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class UpdateAdvertiseController extends Controller
{
    const COUNTER_ROWS = 20;

    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @throws Exception
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(UpdateAdvertiseRequest $request, int $advertiseId)
    {
        Log::debug("UpdateAdvertiseController args advertiseId=$advertiseId");

        $advertise = Advertise::findOrFail($advertiseId);
        $now = Carbon::now();

        DB::beginTransaction();

        try {
            $advertise->update(
                $request->makeAdvertise()->toArray()
            );

            // 広告にリンクがあるとき、広告のクリック数の計測ができるようにするためのカラムを用意
            if ($advertise->link) {
                $doesntExistAdvertiseCounter = AdvertiseCounter::whereAdvertiseId($advertiseId)
                    ->whereLink($advertise->link)
                    ->doesntExist();

                // リンクが変更された時は、新しいカラムを用意する。
                if ($doesntExistAdvertiseCounter) {
                    $advertiseCounter = [];

                    for ($i = self::COUNTER_ROWS; $i > 0; $i--) {
                        $advertiseCounter[] = [
                            AdvertiseCounterProperty::link         => $advertise->link,
                            AdvertiseCounterProperty::count        => 0,
                            AdvertiseCounterProperty::advertise_id => $advertise->id,
                            AdvertiseCounterProperty::created_at   => $now,
                            AdvertiseCounterProperty::updated_at   => $now,
                        ];
                    }

                    AdvertiseCounter::insert($advertiseCounter);
                }
            }

            DB::commit();

            Cache::forget(GetMainTopAdvertiseUsecase::getCacheKey());
            Cache::forget(GetRandomAdvertiseUsecase::getCacheKey());
        } catch (Exception $e) {
            DB::rollBack();

            Log::error('[ERROR] UpdateAdvertiseController', [
                'advertise' => $advertise,
            ]);

            throw $e;
        }
    }
}
