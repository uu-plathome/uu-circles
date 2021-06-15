<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Announcement;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Announcement\UpdateAnnouncementRequest;
use App\Usecases\Admin\Announcement\UpdateAnnouncementUsecase;
use Illuminate\Support\Facades\Log;

final class UpdateAnnouncementController extends Controller
{
    private UpdateAnnouncementUsecase $updateAnnouncementUsecase;

    public function __construct(UpdateAnnouncementUsecase $updateAnnouncementUsecase)
    {
        $this->updateAnnouncementUsecase = $updateAnnouncementUsecase;
    }

    /**
     * お知らせの更新.
     *
     * @param UpdateAnnouncementRequest $request
     * @param int                       $announcementId
     *
     * @throws \Exception
     */
    public function __invoke(UpdateAnnouncementRequest $request, int $announcementId)
    {
        Log::debug('UpdateAnnouncementController args none');

        $this->updateAnnouncementUsecase->invoke(
            $request->makeUpdateAnnouncementUsecaseParam()
        );

    }
}
