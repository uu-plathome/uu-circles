<?php

declare(strict_types=1);

namespace App\UseCases\AdminManagement\Announcement;

use App\Enum\Property\AnnouncementCounterProperty;
use App\Enum\Property\AnnouncementProperty;
use App\Models\Announcement;
use App\Models\AnnouncementCounter;
use App\Support\Str;
use App\UseCases\AdminManagement\Announcement\Params\CreateAnnouncementUsecaseParam;
use Exception;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class CreateAnnouncementUsecase
{
    const MAX_SLUG_CHECK = 3;

    /**
     * お知らせの追加.
     *
     * @param CreateAnnouncementUsecaseParam $param
     *
     * @throws Exception
     */
    public function invoke(CreateAnnouncementUsecaseParam $param)
    {
        Log::debug('CreateAnnouncementUsecase args', [
            'CreateAnnouncementUsecaseParam' => $param,
        ]);

        $now = Carbon::now();

        // slugの生成
        $slug = $this->generateSlug();

        // インサート用のデータ
        $insertData = $this->getInsertData($param, $slug);

        DB::beginTransaction();

        try {
            $announcement = new Announcement();
            // お知らせをDBに保存する
            $announcement->fill($insertData)
                ->save();

            // お知らせの計測ができるようにするためのカラムを用意
            $announcementCounter = [];
            $columnNumbers = AnnouncementCounter::columnNumbers();

            foreach ($columnNumbers as $announcementPlace => $maxColumnNumber) {
                for ($i = $maxColumnNumber; $i > 0; $i--) {
                    $announcementCounter[] = [
                        AnnouncementCounterProperty::announcement_id    => $announcement->id,
                        AnnouncementCounterProperty::count              => 0,
                        AnnouncementCounterProperty::announcement_place => $announcementPlace,
                        AnnouncementCounterProperty::created_at         => $now,
                        AnnouncementCounterProperty::updated_at         => $now,
                    ];
                }
            }

            AnnouncementCounter::insert($announcementCounter);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }
    }

    /**
     * @throws Exception
     */
    private function generateSlug(): string
    {
        $loop = self::MAX_SLUG_CHECK;
        for ($i = $loop; $i > 0; $i--) {
            $newSlug = Str::uuid()->toString();

            if (Announcement::whereSlug($newSlug)->doesntExist()) {
                return $newSlug;
            }
        }

        throw new Exception("UUIDが {$loop} 回重複しました");
    }

    /**
     * DBに挿入するデータ
     *
     * @param CreateAnnouncementUsecaseParam $param
     * @param string                         $slug
     *
     * @return array
     */
    private function getInsertData(CreateAnnouncementUsecaseParam $param, string $slug): array
    {
        return [
            AnnouncementProperty::title                => $param->title,
            AnnouncementProperty::description          => $param->description,
            AnnouncementProperty::link                 => $param->link,
            AnnouncementProperty::slug                 => $slug,
            AnnouncementProperty::announcement_type    => $param->announcement_type,
            AnnouncementProperty::importance           => $param->importance,
            AnnouncementProperty::for_main_view        => $param->for_main_view,
            AnnouncementProperty::for_circle_mail      => $param->for_circle_mail,
            AnnouncementProperty::for_admin_view       => $param->for_admin_view,
            AnnouncementProperty::for_admin_mail       => $param->for_admin_mail,
            AnnouncementProperty::for_newjoy_discord   => $param->for_newjoy_discord,
            AnnouncementProperty::active               => $param->active,
            AnnouncementProperty::is_main_view_fixed   => $param->is_main_view_fixed,
            AnnouncementProperty::is_circle_view_fixed => $param->is_circle_view_fixed,
            AnnouncementProperty::is_admin_view_fixed  => $param->is_admin_view_fixed,
            AnnouncementProperty::notification_time    => $param->notification_time,
            AnnouncementProperty::publish_from         => $param->publish_from,
            AnnouncementProperty::publish_to           => $param->publish_to,
        ];
    }
}
