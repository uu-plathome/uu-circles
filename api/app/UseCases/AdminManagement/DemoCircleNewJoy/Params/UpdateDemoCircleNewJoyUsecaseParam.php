<?php

declare(strict_types=1);

namespace App\UseCases\AdminManagement\DemoCircleNewJoy\Params;

use Illuminate\Support\Carbon;

final class UpdateDemoCircleNewJoyUsecaseParam
{
    public int $demo_circle_newjoy_id;

    public string $title;
    public ?string $description = null;
    public ?string $url = null;
    public ?string $place_of_activity = null;
    public ?string $place_of_activity_detail = null;
    public string $demo_circle_newjoy_type;
    public ?Carbon $start_date = null;
    public ?Carbon $end_date = null;
    public bool $published = true;
}
