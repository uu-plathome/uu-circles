<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Announcement;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class ShowAnnouncementController extends Controller
{
    /**
     * お知らせの取得.
     *
     * @param Request $request
     * @param int     $announcementId
     *
     * @return array
     */
    public function __invoke(Request $request, int $announcementId): array
    {
        Log::debug('ShowAnnouncementController args', [
            'announcementId' => $announcementId,
        ]);

        $announcement = Announcement::findOrFail($announcementId);

        return [
            'data' => Arr::camel_keys($announcement->toArray()),
        ];
    }
}
