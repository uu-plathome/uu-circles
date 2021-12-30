<?php

namespace App\UseCases\AdminManagement\CircleNewJoy\Dto;

use App\Enum\Property\CircleNewJoyProperty as CNP;
use App\Models\CircleNewJoy;
use Illuminate\Support\Carbon;

final class CircleNewJoyDto
{
    public int $circle_new_joy_id;
    public int $circle_id;
    public string $title;
    public ?string $description;
    public ?string $url;
    public ?string $private_newjoy_link;
    public ?string $place_of_activity;
    public ?string $place_of_activity_detail;
    public ?Carbon $publish_from;
    public ?Carbon $start_date;
    public ?Carbon $end_date;
    public ?bool $release;
    public ?Carbon $created_at;
    public ?Carbon $updated_at;

    public static function byEloquent(CircleNewJoy $circleNewJoy): self
    {
        $dto = new self();

        $dto->circle_new_joy_id = $circleNewJoy->id;
        $dto->circle_id = $circleNewJoy->circle_id;
        $dto->title = $circleNewJoy->title;
        $dto->description = $circleNewJoy->description;
        $dto->url = $circleNewJoy->url;
        $dto->private_newjoy_link = $circleNewJoy->private_newjoy_link;
        $dto->place_of_activity = $circleNewJoy->place_of_activity;
        $dto->place_of_activity_detail = $circleNewJoy->place_of_activity_detail;
        $dto->publish_from = $circleNewJoy->publish_from;
        $dto->start_date = $circleNewJoy->start_date;
        $dto->end_date = $circleNewJoy->end_date;
        $dto->release = $circleNewJoy->release;
        $dto->created_at = $circleNewJoy->created_at;
        $dto->updated_at = $circleNewJoy->updated_at;

        return $dto;
    }

    public function toArray(): array
    {
        return [
            'circle_new_joy_id'             => $this->circle_new_joy_id,
            CNP::circle_id                  => $this->circle_id,
            CNP::title                      => $this->title,
            CNP::description                => $this->description,
            CNP::url                        => $this->url,
            CNP::place_of_activity          => $this->place_of_activity,
            CNP::place_of_activity_detail   => $this->place_of_activity_detail,
            CNP::publish_from               => $this->publish_from ? $this->start_date->format('Y-m-d') : null,
            CNP::start_date                 => $this->start_date ? $this->start_date->format('Y-m-d H:i') : null,
            CNP::end_date                   => $this->end_date ? $this->end_date->format('Y-m-d H:i') : null,
            CNP::release                    => $this->release,
            CNP::created_at                 => $this->created_at,
            CNP::updated_at                 => $this->updated_at,
        ];
    }
}
