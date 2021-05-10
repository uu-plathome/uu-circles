<?php

namespace App\Usecases\Admin\Announcement;

use App\Enum\Property\AnnouncementProperty;
use App\Models\Announcement;
use App\Usecases\Admin\Announcement\Params\UpdateAnnouncementUsecaseParam;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdateAnnouncementUsecase
{
    /**
     * お知らせの更新
     *
     * @param UpdateAnnouncementUsecaseParam $param
     * @throws \Exception
     */
    public function invoke(UpdateAnnouncementUsecaseParam $param)
    {
        Log::debug("UpdateAnnouncementUsecase args", [
            "UpdateAnnouncementUsecaseParam" => $param,
        ]);

        // インサート用のデータ
        $insertData = $this->getInsertData($param);

        DB::beginTransaction();
        try {
            // お知らせをDBに保存する
            Announcement::findOrFail($param->announcement_id)
                ->fill($insertData)
                ->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * DBに挿入するデータ
     *
     * @param UpdateAnnouncementUsecaseParam $param
     * @return array
     */
    private function getInsertData(UpdateAnnouncementUsecaseParam $param): array
    {
        return [
            AnnouncementProperty::title              => $param->title,
            AnnouncementProperty::description        => $param->description,
            AnnouncementProperty::link               => $param->link,
            AnnouncementProperty::announcement_type  => $param->announcement_type,
            AnnouncementProperty::for_main_view      => $param->for_main_view,
            AnnouncementProperty::for_circle_view    => $param->for_circle_view,
            AnnouncementProperty::for_circle_mail    => $param->for_circle_mail,
            AnnouncementProperty::for_admin_view     => $param->for_admin_view,
            AnnouncementProperty::for_admin_mail     => $param->for_admin_mail,
            AnnouncementProperty::for_newjoy_discord => $param->for_newjoy_discord,
            AnnouncementProperty::active             => $param->active,
            AnnouncementProperty::notification_time  => $param->notification_time,
            AnnouncementProperty::publish_from       => $param->publish_from,
            AnnouncementProperty::publish_to         => $param->publish_to,
        ];
    }
}
