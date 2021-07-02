<?php

namespace App\Usecases\Admin\DemoCircleNewJoy\Dto;

use App\Models\DemoCircleNewjoy;
use Illuminate\Support\Carbon;

final class DemoCircleNewJoyDto
{
    public int $demo_circle_new_joy_id;
    public int $circle_id;
    public string $title;
    public ?string $description;
    public ?string $url;
    public ?string $place_of_activity;
    public ?string $place_of_activity_detail;
    public string $demo_circle_newjoy_type;
    public ?Carbon $start_date;
    public ?Carbon $end_date;
    public ?bool $published;
    public ?Carbon $created_at;
    public ?Carbon $updated_at;

    public static function byEloquent(DemoCircleNewjoy $circleNewJoy): self
    {
        $dto = new self();

        $dto->demo_circle_new_joy_id = $circleNewJoy->id;
        $dto->circle_id = $circleNewJoy->circle_id;
        $dto->title = $circleNewJoy->title;
        $dto->description = $circleNewJoy->description;
        $dto->url = $circleNewJoy->url;
        $dto->place_of_activity = $circleNewJoy->place_of_activity;
        $dto->place_of_activity_detail = $circleNewJoy->place_of_activity_detail;
        $dto->demo_circle_newjoy_type = $circleNewJoy->demo_circle_newjoy_type;
        $dto->start_date = $circleNewJoy->start_date;
        $dto->end_date = $circleNewJoy->end_date;
        $dto->published = $circleNewJoy->published;
        $dto->created_at = $circleNewJoy->created_at;
        $dto->updated_at = $circleNewJoy->updated_at;

        return $dto;
    }

    public function toArray(): array
    {
        return [
            'demo_circle_new_joy_id'     => $this->demo_circle_new_joy_id,
            'circle_id'                  => $this->circle_id,
            'title'                      => $this->title,
            'description'                => $this->description,
            'url'                        => $this->url,
            'place_of_activity'          => $this->place_of_activity,
            'place_of_activity_detail'   => $this->place_of_activity_detail,
            'demo_circle_newjoy_type'    => $this->demo_circle_newjoy_type,
            'start_date'                 => $this->start_date->format('Y-m-d H:i'),
            'end_date'                   => $this->end_date->format('Y-m-d H:i'),
            'published'                  => $this->published,
            'created_at'                 => $this->created_at,
            'updated_at'                 => $this->updated_at,
        ];
    }
}
