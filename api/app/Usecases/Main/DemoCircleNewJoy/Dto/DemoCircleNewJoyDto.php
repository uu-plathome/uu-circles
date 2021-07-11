<?php

namespace App\Usecases\Main\DemoCircleNewJoy\Dto;

use App\Enum\Property\DemoCircleNewJoyProperty;
use App\Models\DemoCircleNewjoy;
use Illuminate\Support\Carbon;

class DemoCircleNewJoyDto
{
    public ?int $id;
    public ?int $circle_id;
    public string $title;
    public ?string $description;
    public ?string $url;
    public ?string $place_of_activity;
    public ?string $place_of_activity_detail;
    public ?Carbon $start_date;
    public ?Carbon $end_date;
    public ?bool $published;
    public ?Carbon $created_at;
    public ?Carbon $updated_at;

    public static function byEloquent(DemoCircleNewjoy $demoCircleNewJoy): self
    {
        $dto = new self();

        $dto->id = $demoCircleNewJoy->id;
        $dto->circle_id = $demoCircleNewJoy->circle_id;
        $dto->title = $demoCircleNewJoy->title;
        $dto->description = $demoCircleNewJoy->description;
        $dto->url = $demoCircleNewJoy->url;
        $dto->place_of_activity = $demoCircleNewJoy->place_of_activity;
        $dto->place_of_activity_detail = $demoCircleNewJoy->place_of_activity_detail;
        $dto->start_date = $demoCircleNewJoy->start_date;
        $dto->end_date = $demoCircleNewJoy->end_date;
        $dto->published = $demoCircleNewJoy->published;
        $dto->created_at = $demoCircleNewJoy->created_at;
        $dto->updated_at = $demoCircleNewJoy->updated_at;

        return $dto;
    }

    public function toArray(): array
    {
        return [
            DemoCircleNewJoyProperty::id                       => $this->id,
            DemoCircleNewJoyProperty::circle_id                => $this->circle_id,
            DemoCircleNewJoyProperty::title                    => $this->title,
            DemoCircleNewJoyProperty::description              => $this->description,
            DemoCircleNewJoyProperty::url                      => $this->url,
            DemoCircleNewJoyProperty::place_of_activity        => $this->place_of_activity,
            DemoCircleNewJoyProperty::place_of_activity_detail => $this->place_of_activity_detail,
            DemoCircleNewJoyProperty::start_date               => $this->start_date,
            DemoCircleNewJoyProperty::end_date                 => $this->end_date,
            DemoCircleNewJoyProperty::published                => $this->published,
            DemoCircleNewJoyProperty::created_at               => $this->created_at,
            DemoCircleNewJoyProperty::updated_at               => $this->updated_at,
        ];
    }
}
