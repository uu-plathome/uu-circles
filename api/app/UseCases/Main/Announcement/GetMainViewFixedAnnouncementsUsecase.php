<?php

declare(strict_types=1);

namespace App\UseCases\Main\Announcement;

use App\Enum\Property\AnnouncementProperty;
use App\Models\Announcement;
use App\UseCases\Main\Announcement\Dto\GetMainViewFixedAnnouncementsUsecaseDto;
use App\UseCases\Main\Announcement\Dto\MainAnnouncementDto;
use Illuminate\Support\Carbon;

final class GetMainViewFixedAnnouncementsUsecase
{
    /**
     * キャッシュする時間.
     */
    const TTL = 60 * 60;

    /**
     * メイン画面に固定して、表示するお知らせを取得.
     */
    public function invoke(): GetMainViewFixedAnnouncementsUsecaseDto
    {
        $now = Carbon::now();

        // DBからお知らせを取得
        $announcements = Announcement::nowPublic($now)
            ->whereForMainView(true)
            ->whereIsMainViewFixed(true)
            ->select([
                AnnouncementProperty::id,
                AnnouncementProperty::title,
                AnnouncementProperty::description,
                AnnouncementProperty::announcement_type,
                AnnouncementProperty::importance,
                AnnouncementProperty::link,
                AnnouncementProperty::slug,
                AnnouncementProperty::active,
                AnnouncementProperty::publish_from,
                AnnouncementProperty::publish_to,
            ])
            ->get();

        // 戻り値の生成
        $dto = new GetMainViewFixedAnnouncementsUsecaseDto();
        $dto->announcements = $announcements->map(
            fn (Announcement $announcement) => MainAnnouncementDto::byEloquent($announcement)
        )->toArray();

        return $dto;
    }

    /**
     * キャッシュのためのキー
     *
     * @return string
     */
    public static function getCacheKey(): string
    {
        return 'GetMainViewFixedAnnouncementsUsecase1' . Carbon::today()->format('Y-m-d h');
    }
}
