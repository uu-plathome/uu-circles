<?php

namespace App\Usecases\Admin\Announcement;

use App\Usecases\Admin\Announcement\Params\UpdateAnnouncementUsecaseParam;
use Illuminate\Support\Facades\Log;

class UpdateAnnouncementUsecase
{
    public function invoke(UpdateAnnouncementUsecaseParam $param)
    {
        Log::debug("UpdateAnnouncementUsecase args", [
            "UpdateAnnouncementUsecaseParam" => $param,
        ]);
    }
}
