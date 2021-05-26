<?php

namespace App\Http\Controllers\Circle\Announcement;

use App\Enum\Property\AnnouncementProperty;
use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class FixedCircleViewAnnouncementController extends Controller
{
    const TTL = 60 * 60;

    /**
     * サークル管理画面に固定表示するお知らせの取得
     *
     * @param Request $request
     * @return array
     */
    public function __invoke(Request $request): array
    {
        Log::debug("FixedCircleViewAnnouncementController args none");

        $now = Carbon::now();

        // お知らせ取得
        /** @var Announcement $announcement */
        $announcement = Cache::remember(
            $this->getCacheKey(),
            self::TTL,
            fn () => Announcement::nowPublic($now)
                ->whereIsCircleViewFixed(true)
                ->orderByDesc(AnnouncementProperty::updated_at)
                ->first()
        );

        return [
            'data' => !is_null($announcement)
                ? Arr::camel_keys($announcement->toArray())
                : null,
        ];
    }

    private function getCacheKey(): string
    {
        return 'FixedCircleViewAnnouncementController' . Carbon::today()->format("Y-m-d H");
    }
}
