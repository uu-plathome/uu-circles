<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Announcement;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class IndexAnnouncementController extends Controller
{
    /**
     * お知らせ一覧
     *
     * @param Request $request
     * @return array
     */
    public function __invoke(Request $request): array
    {
        Log::debug("IndexAnnouncementController args none");

        $announcements = Announcement::all();

        return [
            'data' => Arr::camel_keys(
                $announcements->map(
                    fn (Announcement $announcement) => $announcement->toArray()
                )->toArray()
            ),
        ];
    }
}
