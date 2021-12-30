<?php

namespace App\UseCases\AdminManagement\CircleNewJoy\Params;

use Illuminate\Support\Carbon;

final class CreateCircleNewJoyUsecaseParam
{
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
