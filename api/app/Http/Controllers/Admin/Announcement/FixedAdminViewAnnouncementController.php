<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Announcement;

use App\Enum\Property\AnnouncementProperty;
use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

final class FixedAdminViewAnnouncementController extends Controller
{
    /**
     * 管理者画面に固定表示するお知らせの取得.
     *
     * @param Request $request
     *
     * @return array
     */
    public function __invoke(Request $request): array
    {
        Log::debug('FixedAdminViewAnnouncementController args none');

        $now = Carbon::now();

        // お知らせ取得
        $announcement = Announcement::nowPublic($now)
            ->whereForAdminView(true)
            ->whereIsAdminViewFixed(true)
            ->orderByDesc(AnnouncementProperty::updated_at)
            ->first();

        return [
            'data' => !is_null($announcement)
                ? Arr::camel_keys($announcement->toArray())
                : null,
        ];
    }
}
