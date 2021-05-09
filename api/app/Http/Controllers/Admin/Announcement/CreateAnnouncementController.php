<?php

namespace App\Http\Controllers\Admin\Announcement;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Announcement\CreateAnnouncementRequest;
use Illuminate\Support\Facades\Log;

class CreateAnnouncementController extends Controller
{
    /**
     * お知らせの追加
     *
     * @param CreateAnnouncementRequest $request
     */
    public function __invoke(CreateAnnouncementRequest $request)
    {
        Log::debug("CreateAnnouncementController args none");

        return;
    }
}
