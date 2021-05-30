<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Announcement;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Announcement\CreateAnnouncementRequest;
use App\Support\Arr;
use App\Usecases\Admin\Announcement\CreateAnnouncementUsecase;
use Illuminate\Support\Facades\Log;

final class CreateAnnouncementController extends Controller
{
    private CreateAnnouncementUsecase $createAnnouncementUsecase;

    public function __construct(CreateAnnouncementUsecase $createAnnouncementUsecase)
    {
        $this->createAnnouncementUsecase = $createAnnouncementUsecase;
    }

    /**
     * お知らせの追加
     *
     * @param CreateAnnouncementRequest $request
     * @throws \Exception
     */
    public function __invoke(CreateAnnouncementRequest $request)
    {
        Log::debug("CreateAnnouncementController args none");

        $this->createAnnouncementUsecase->invoke(
            $request->makeCreateAnnouncementUsecaseParam()
        );
    }
}
