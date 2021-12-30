<?php

namespace App\Usecases\AdminManagement\CircleNewJoy\Params;

use Illuminate\Support\Carbon;

final class UpdateCircleNewJoyUsecaseParam
{
    public int $circle_new_joy_id;
    public int $circle_id;
    public string $title;
    public ?string $description;
    public ?string $url;
    public ?string $private_newjoy_url;
    public ?string $place_of_activity;
    public ?string $place_of_activity_detail;
    public ?Carbon $publish_from;
    public ?Carbon $start_date;
    public ?Carbon $end_date;
    public bool $release;
}
