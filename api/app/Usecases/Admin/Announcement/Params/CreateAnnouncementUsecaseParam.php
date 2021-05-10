<?php

namespace App\Usecases\Admin\Announcement\Params;

use Illuminate\Support\Carbon;

class CreateAnnouncementUsecaseParam
{
    public string $title;
    public ?string $description;
    public ?string $link;
    public string $announcement_type;
    public bool $for_main_view;
    public bool $for_circle_view;
    public bool $for_circle_mail;
    public bool $for_admin_view;
    public bool $for_admin_mail;
    public bool $for_newjoy_discord;
    public bool $active;
    public ?Carbon $notification_time;
    public ?Carbon $publish_from;
    public ?Carbon $publish_to;
}
