<?php

namespace App\ValueObjects;

use App\Enum\CircleNewJoyModel;
use App\Models\CircleNewJoy;
use App\Support\Arr;
use Illuminate\Support\Carbon;

class CircleNewJoyValueObject
{
    public ?int $id;
    public ?int $circle_id;
    public string $title;
    public ?string $description;
    public ?string $url;
    public ?string $place_of_activity;
    public ?string $place_of_activity_detail;
    public ?Carbon $publish_from;
    public ?Carbon $publish_to;
    public ?Carbon $start_date;
    public ?Carbon $end_date;
    public ?bool $release;
    public ?Carbon $created_at;
    public ?Carbon $updated_at;

    public static function of(array $inputs): CircleNewJoyValueObject
    {
        $circleNewJoyValueObject = new CircleNewJoyValueObject();
        $circleNewJoyValueObject->id = Arr::get($inputs, CircleNewJoyModel::id);
        $circleNewJoyValueObject->title = Arr::get($inputs, CircleNewJoyModel::title);
        $circleNewJoyValueObject->description = Arr::get($inputs, CircleNewJoyModel::description);
        $circleNewJoyValueObject->url = Arr::get($inputs, CircleNewJoyModel::url);
        $circleNewJoyValueObject->place_of_activity = Arr::get($inputs, CircleNewJoyModel::place_of_activity);
        $circleNewJoyValueObject->place_of_activity_detail = Arr::get($inputs, CircleNewJoyModel::place_of_activity_detail);
        $circleNewJoyValueObject->publish_from = Arr::get($inputs, CircleNewJoyModel::publish_from);
        $circleNewJoyValueObject->publish_to = Arr::get($inputs, CircleNewJoyModel::publish_to);
        $circleNewJoyValueObject->start_date = Arr::get($inputs, CircleNewJoyModel::start_date);
        $circleNewJoyValueObject->end_date = Arr::get($inputs, CircleNewJoyModel::end_date);
        $circleNewJoyValueObject->release = Arr::get($inputs, CircleNewJoyModel::release);
        $circleNewJoyValueObject->created_at = Arr::get($inputs, CircleNewJoyModel::created_at);
        $circleNewJoyValueObject->updated_at = Arr::get($inputs, CircleNewJoyModel::updated_at);

        return $circleNewJoyValueObject;
    }

    public static function byEloquent(CircleNewJoy $circleNewJoy): CircleNewJoyValueObject
    {
        return self::of($circleNewJoy->toArray());
    }

    public function toCircleNewJoy(): CircleNewJoy
    {
        return (new CircleNewJoy())->forceFill($this->toArray());
    }

    public function toArray(): array
    {
        return [
            CircleNewJoyModel::id => $this->id,
            CircleNewJoyModel::circle_id => $this->circle_id,
            CircleNewJoyModel::title => $this->title,
            CircleNewJoyModel::description => $this->description,
            CircleNewJoyModel::url => $this->url,
            CircleNewJoyModel::place_of_activity => $this->place_of_activity,
            CircleNewJoyModel::place_of_activity_detail => $this->place_of_activity_detail,
            CircleNewJoyModel::publish_from => $this->publish_from,
            CircleNewJoyModel::publish_to => $this->publish_to,
            CircleNewJoyModel::start_date => $this->start_date,
            CircleNewJoyModel::end_date => $this->end_date,
            CircleNewJoyModel::release => $this->release,
            CircleNewJoyModel::created_at => $this->created_at,
            CircleNewJoyModel::updated_at => $this->updated_at,
        ];
    }
}
