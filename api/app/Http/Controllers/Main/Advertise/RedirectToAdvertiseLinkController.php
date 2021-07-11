<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\Advertise;

use App\Models\Advertise;
use App\Models\AdvertiseCounter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

final class RedirectToAdvertiseLinkController
{
    /**
     * 広告をクリックした時にリダイレクトする.
     *
     * @param Request $request
     * @param string  $slug
     *
     * @return RedirectResponse
     */
    public function __invoke(Request $request, string $slug): RedirectResponse
    {
        Log::debug('RedirectToAdvertiseLinkController', [
            'slug' => $slug,
        ]);

        $advertise = Advertise::nowPublic(Carbon::now())->whereSlug($slug)->first();

        if (is_null($advertise)) {
            Log::warning('存在しない広告のslugが選択されています', [
                'slug' => $slug,
            ]);

            return redirect()->away($this->redirectToHomeUrl());
        }

        if (!$advertise->link) {
            Log::warning('広告にlinkが設定されていません。', [
                'slug'      => $slug,
                'advertise' => $advertise,
            ]);

            return redirect()->away($this->redirectToHomeUrl());
        }

        Log::debug('RedirectToAdvertiseLinkController count up start');

        // 広告のクリック数
        AdvertiseCounter::whereAdvertiseId($advertise->id)
            ->whereLink($advertise->link)
            ->inRandomOrder()
            ->first()
            ->increment('count', 1);

        Log::debug('RedirectToAdvertiseLinkController redirect to', [
            'link' => $advertise->link,
        ]);

        return redirect()->away($advertise->link);
    }

    private function redirectToHomeUrl(): string
    {
        return config('app.client_url');
    }
}
