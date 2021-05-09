<?php

namespace App\Http\Controllers\Admin\Announcement;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Announcement\UpdateAnnouncementRequest;

class UpdateAnnouncementController extends Controller
{
    /**
     * お知らせの更新
     *
     * @param UpdateAnnouncementRequest $request
     */
    public function __invoke(UpdateAnnouncementRequest $request)
    {
        return;
    }
}
