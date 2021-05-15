<?php

namespace App\Http\Controllers\Main\Announcement;

use App\Enum\AnnouncementPlace;
use App\Enum\SlugProperty\AnnouncementPlaceQuerySlugProperty;
use App\Models\Announcement;
use App\Models\AnnouncementCounter;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class RedirectToAnnouncementLinkController
{
    const place = 'place';

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke(Request $request, string $slug)
    {
        Log::debug("RedirectToAnnouncementLinkController", [
            'slug' => $slug,
        ]);

        $announcement = Announcement::nowPublic(Carbon::now())
            ->whereSlug($slug)
            ->first();
        $place = $request->query(self::place, AnnouncementPlaceQuerySlugProperty::main_fixed_view);
        $announcementPlace = $this->queryToAnnouncementPlace($place);

        if (is_null($announcement)) {
            Log::warning("存在しないお知らせのslugが選択されています", [
                'slug' => $slug,
            ]);

            return;
        }

        if (!$announcement->link) {
            Log::warning("お知らせにlinkが設定されていません。", [
                'slug'      => $slug,
                'advertise' => $announcement,
            ]);

            return;
        }

        Log::debug("RedirectToAnnouncementLinkController count up start");

        // 広告のクリック数
        AnnouncementCounter::whereAnnouncementId($announcement->id)
            ->whereAnnouncementPlace($announcementPlace)
            ->inRandomOrder()
            ->first()
            ->increment('count', 1);

        Log::debug("RedirectToAnnouncementLinkController redirect to", [
            'link' => $announcement->link,
        ]);

        return redirect()->away($announcement->link);
    }

    /**
     * クエリパラメータからenumを生成
     *
     * @param string $query
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

        return AnnouncementPlaceQuerySlugProperty::main_fixed_view;
    }
}
