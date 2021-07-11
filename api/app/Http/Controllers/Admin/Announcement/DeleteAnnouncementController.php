<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Announcement;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class DeleteAnnouncementController extends Controller
{
    /**
     * お知らせの削除.
     *
     * @param Request $request
     * @param int     $announcementId
     */
    public function __invoke(Request $request, int $announcementId)
    {
        Log::debug('DeleteAnnouncementController args none');

        Announcement::findOrFail($announcementId)->delete();
    }
}
