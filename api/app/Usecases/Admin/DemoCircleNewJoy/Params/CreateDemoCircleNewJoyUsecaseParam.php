<?php

declare(strict_types=1);

namespace App\Usecases\Admin\DemoCircleNewJoy\Params;

use Illuminate\Support\Carbon;

final class CreateDemoCircleNewJoyUsecaseParam
{
    public int $circle_id;

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
