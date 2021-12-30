<?php

declare(strict_types=1);

namespace App\Usecases\AdminManagement\Announcement\Params;

use Illuminate\Support\Carbon;

final class CreateAnnouncementUsecaseParam
{
    public string $title;
    public ?string $description;
    public ?string $link;
    public string $announcement_type;
    public string $importance;
    public bool $for_main_view;
    public bool $for_circle_mail;
    public bool $for_admin_view;
    public bool $for_admin_mail;
    public bool $for_newjoy_discord;
    public bool $active;
    public bool $is_main_view_fixed;
    public bool $is_circle_view_fixed;
    public bool $is_admin_view_fixed;
    public ?Carbon $notification_time;
    public ?Carbon $publish_from;
    public ?Carbon $publish_to;
}
