<?php

namespace App\Http\Controllers\Admin\Announcement;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Announcement\UpdateAnnouncementRequest;
use Illuminate\Support\Facades\Log;

class UpdateAnnouncementController extends Controller
{
    /**
     * お知らせの更新
     *
     * @param UpdateAnnouncementRequest $request
     * @param int $announcementId
     */
    public function __invoke(UpdateAnnouncementRequest $request, int $announcementId)
    {
        Log::debug("UpdateAnnouncementController args none");

        return;
    }
}
