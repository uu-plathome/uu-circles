<?php

use App\Enum\Property\AnnouncementProperty;

return [
    AnnouncementProperty::title              => 'タイトル',
    AnnouncementProperty::description        => 'お知らせ文',
    AnnouncementProperty::link               => 'お知らせURL',
    AnnouncementProperty::announcement_type  => 'お知らせ種類',
    AnnouncementProperty::for_main_view      => 'メイン画面に表示するかどうか',
    AnnouncementProperty::for_circle_view    => 'サークル管理画面に表示するかどうか',
    AnnouncementProperty::for_circle_mail    => 'サークル管理者にメール通知するかどうか',
    AnnouncementProperty::for_admin_view     => '管理者画面に表示するかどうか',
    AnnouncementProperty::for_admin_mail     => '管理者にメール通知するかどうか',
    AnnouncementProperty::for_newjoy_discord => '新歓ディスコードに通知するかどうか',
    AnnouncementProperty::active             => '通知日時',
    AnnouncementProperty::notification_time  => '公開設定',
    AnnouncementProperty::publish_from       => '公開開始日時',
    AnnouncementProperty::publish_to         => '公開終了日時',
];
