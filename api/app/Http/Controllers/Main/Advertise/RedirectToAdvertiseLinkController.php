<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\Advertise;

use App\Models\Advertise;
use App\Models\AdvertiseCounter;
use App\Support\Str;
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
        Log::debug('RedirectToAdvertiseLinkController args', [
            'slug' => $slug,
        ]);

        $advertise = Advertise::nowPublic(Carbon::now())
            ->whereSlug($slug)
            ->first();

        // 広告がないとき
        if (is_null($advertise)) {
            // header['from']を取得する
            $headerFrom = $request->header('from'); // 例) googlebot(at)googlebot.com
            // Bot かどうかを判定する
            if (is_string($headerFrom) && Str::contains($headerFrom, 'bot')) {
                return redirect()->away($this->redirectToHomeUrl());
            }

            // header['user-agent']を取得する
            $userAgent = $request->header('user-agent'); // 例 "Mozilla/5.0 (compatible; MJ12bot/v1.4.8; http://mj12bot.com/)"
            // Bot かどうかを判定する
            if (is_string($userAgent) && Str::contains($userAgent, 'bot')) {
                return redirect()->away($this->redirectToHomeUrl());
            }

            // Bot でない場合は、warningを出力してリダイレクトする
            Log::warning('RedirectToAdvertiseLinkController 存在しない広告のslugが選択されています', [
                'slug'        => $slug,
                'redirect_to' => $this->redirectToHomeUrl(),
            ]);

            return redirect()->away($this->redirectToHomeUrl());
        }

        // 広告はあるが、広告に link が設定されていないとき
        if (!$advertise->link) {
            Log::warning('RedirectToAdvertiseLinkController 広告にlinkが設定されていません。', [
                'slug'        => $slug,
                'advertise'   => $advertise,
                'redirect_to' => $this->redirectToHomeUrl(),
            ]);

            return redirect()->away($this->redirectToHomeUrl());
        }

        Log::debug('RedirectToAdvertiseLinkController count up start');

        // 広告のクリック数をカウントアップする
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
