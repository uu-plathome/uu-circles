<?php

namespace App\Usecases\Admin\Announcement;

use App\Usecases\Admin\Announcement\Params\CreateAnnouncementUsecaseParam;
use Illuminate\Support\Facades\Log;

class CreateAnnouncementUsecase
{
    public function invoke(CreateAnnouncementUsecaseParam $param)
    {
        Log::debug("CreateAnnouncementUsecase args", [
            "CreateAnnouncementUsecaseParam" => $param,
        ]);
    }
}
