<?php

declare(strict_types=1);

namespace App\Enum;

final class AnnouncementPlace
{
    /**
     * メイン画面 (固定表示).
     */
    const MAIN_FIXED_VIEW = 'MAIN_FIXED_VIEW';

    /**
     * メイン画面 (お知らせページ).
     */
    const MAIN_ANNOUNCEMENT_PAGE = 'MAIN_ANNOUNCEMENT_PAGE';

    /**
     * サークル管理画面 (固定表示).
     */
    const CIRCLE_FIXED_VIEW = 'CIRCLE_FIXED_VIEW';

    /**
     * サークル管理者へのメール.
     */
    const CIRCLE_MAIL = 'CIRCLE_MAIL';

    /**
     * 管理者画面 (固定表示).
     */
    const ADMIN_FIXED_VIEW = 'ADMIN_FIXED_VIEW';

    /**
     * 管理者へのメール.
     */
    const ADMIN_MAIL = 'ADMIN_MAIL';

    /**
     * 新歓Discord.
     */
    const NEWJOY_DISCORD = 'NEWJOY_DISCORD';

    /**
     * Twitter.
     */
    const TWITTER = 'TWITTER';
}
