<?php

declare(strict_types=1);

namespace App\Usecases\CircleManagement\CircleNewJoy\Params;

use Illuminate\Support\Carbon;

final class UpdateCircleNewJoyUsecaseParam
{
    public int $circle_id;
    public int $circle_newjoy_id;

    public string $title;
    public ?string $description = null;
    public ?string $url = null;
    public ?string $private_newjoy_link = null;
    public ?string $place_of_activity = null;
    public ?string $place_of_activity_detail = null;
    public ?Carbon $publish_from = null;
    public ?Carbon $start_date = null;
    public ?Carbon $end_date = null;
    public ?bool $release = null;
}
