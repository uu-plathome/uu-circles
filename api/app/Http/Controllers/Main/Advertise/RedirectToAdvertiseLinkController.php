<?php

namespace App\Http\Controllers\Main\Advertise;

use App\Models\Advertise;
use App\Models\AdvertiseCounter;
use Illuminate\Http\Request;

class RedirectToAdvertiseLinkController
{
    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke(Request $request, string $slug)
    {
        $advertise = Advertise::whereSlug($slug)->first();

        if (is_null($advertise)) {
            Log::warning("存在しない広告のslugが選択されています", [
                'slug' => $slug,
            ]);

            return;
        }

        if (!$advertise->link) {
            Log::warning("広告にlinkが設定されていません。", [
                'slug'      => $slug,
                'advertise' => $advertise,
            ]);

            return;
        }

        AdvertiseCounter::whereAdvertiseId($advertise->id)
            ->whereLink($advertise->link)
            ->inRandomOrder()
            ->first()
            ->increment('count', 1);

        return redirect()->away($advertise->link);
    }
}
