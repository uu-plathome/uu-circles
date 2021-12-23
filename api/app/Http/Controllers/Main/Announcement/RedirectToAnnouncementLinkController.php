<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\Announcement;

use App\Enum\AnnouncementPlace;
use App\Enum\SlugProperty\AnnouncementPlaceQuerySlugProperty;
use App\Models\Announcement;
use App\Models\AnnouncementCounter;
use App\Support\Str;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

final class RedirectToAnnouncementLinkController
{
    const place = 'place';

    /**
     * @param Request $request
     * @param string  $slug
     *
     * @return RedirectResponse
     */
    public function __invoke(Request $request, string $slug): RedirectResponse
    {
        Log::debug('RedirectToAnnouncementLinkController', [
            'slug' => $slug,
        ]);

        $announcement = Announcement::nowPublic(Carbon::now())
            ->whereSlug($slug)
            ->first();
        $place = $request->query(self::place, AnnouncementPlaceQuerySlugProperty::main_fixed_view);
        $announcementPlace = $this->queryToAnnouncementPlace($place);

        if (is_null($announcement)) {
            // header['from']を取得する
            $headerFrom = $request->header('from'); // 例) googlebot(at)googlebot.com
            // Bot かどうかを判定する
            if (is_string($headerFrom) && Str::contains($headerFrom, 'bot')) {
                return redirect()->away($this->redirectToHomeUrl());
            }

            // header['user-agent']を取得する
            $userAgent = $request->header("user-agent"); // 例 "Mozilla/5.0 (compatible; MJ12bot/v1.4.8; http://mj12bot.com/)"
            // Bot かどうかを判定する
            if (is_string($userAgent) && Str::contains($userAgent, 'bot')) {
                return redirect()->away($this->redirectToHomeUrl());
            }

            Log::warning('存在しないお知らせのslugが選択されています', [
                'slug' => $slug,
                'redirect_to' => $this->redirectToHomeUrl(),
            ]);

            return redirect()->away($this->redirectToHomeUrl());
        }

        if (!$announcement->link) {
            Log::warning('お知らせにlinkが設定されていません。', [
                'slug'      => $slug,
                'advertise' => $announcement,
            ]);

            return redirect()->away($this->redirectToHomeUrl());
        }

        Log::debug('RedirectToAnnouncementLinkController count up start');

        // 広告のクリック数
        AnnouncementCounter::whereAnnouncementId($announcement->id)
            ->whereAnnouncementPlace($announcementPlace)
            ->inRandomOrder()
            ->first()
            ->increment('count', 1);

        Log::debug('RedirectToAnnouncementLinkController redirect to', [
            'link' => $announcement->link,
        ]);

        return redirect()->away($announcement->link);
    }

    /**
     * クエリパラメータからenumを生成.
     *
     * @param string $query
     *
     * @return AnnouncementPlace|string
     */
    private function queryToAnnouncementPlace(string $query): string
    {
        if ($query === AnnouncementPlaceQuerySlugProperty::main_fixed_view) {
            return AnnouncementPlace::MAIN_FIXED_VIEW;
        }

        if ($query === AnnouncementPlaceQuerySlugProperty::main_view) {
            return AnnouncementPlace::MAIN_ANNOUNCEMENT_PAGE;
        }

        if ($query === AnnouncementPlaceQuerySlugProperty::newjoy_discord) {
            return AnnouncementPlace::NEWJOY_DISCORD;
        }

        if ($query === AnnouncementPlaceQuerySlugProperty::twitter) {
            return AnnouncementPlace::TWITTER;
        }

        return AnnouncementPlaceQuerySlugProperty::main_fixed_view;
    }

    private function redirectToHomeUrl(): string
    {
        return config('app.client_url');
    }
}
