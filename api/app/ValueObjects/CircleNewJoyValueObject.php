<?php

namespace App\ValueObjects;

use App\Enum\Property\CircleNewJoyProperty;
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
    public ?string $private_newjoy_url;
    public ?string $place_of_activity;
    public ?string $place_of_activity_detail;
    public ?Carbon $publish_from;
    public ?Carbon $start_date;
    public ?Carbon $end_date;
    public ?bool $release;
    public ?Carbon $created_at;
    public ?Carbon $updated_at;

    public static function of(array $inputs): CircleNewJoyValueObject
    {
        $circleNewJoyValueObject = new CircleNewJoyValueObject();
        $circleNewJoyValueObject->id = Arr::get($inputs, CircleNewJoyProperty::id);
        $circleNewJoyValueObject->circle_id = Arr::get($inputs, CircleNewJoyProperty::circle_id);
        $circleNewJoyValueObject->title = Arr::get($inputs, CircleNewJoyProperty::title);
        $circleNewJoyValueObject->description = Arr::get($inputs, CircleNewJoyProperty::description);
        $circleNewJoyValueObject->url = Arr::get($inputs, CircleNewJoyProperty::url);
        $circleNewJoyValueObject->private_newjoy_url = Arr::get($inputs, CircleNewJoyProperty::private_newjoy_link);
        $circleNewJoyValueObject->place_of_activity = Arr::get($inputs, CircleNewJoyProperty::place_of_activity);
        $circleNewJoyValueObject->place_of_activity_detail = Arr::get($inputs, CircleNewJoyProperty::place_of_activity_detail);

        $publishFrom = Arr::get($inputs, CircleNewJoyProperty::publish_from);
        $circleNewJoyValueObject->publish_from = is_string($publishFrom) ? new Carbon($publishFrom) : $publishFrom;

        $startDate = Arr::get($inputs, CircleNewJoyProperty::start_date);
        $circleNewJoyValueObject->start_date = is_string($startDate) ? new Carbon($startDate) : $startDate;

        $endDate = Arr::get($inputs, CircleNewJoyProperty::end_date);
        $circleNewJoyValueObject->end_date = is_string($endDate) ? new Carbon($endDate) : $endDate;
        $circleNewJoyValueObject->release = Arr::get($inputs, CircleNewJoyProperty::release);

        $createdAt = Arr::get($inputs, CircleNewJoyProperty::created_at);
        $circleNewJoyValueObject->created_at = is_string($createdAt) ? new Carbon($createdAt) : $createdAt;
        $updatedAt = Arr::get($inputs, CircleNewJoyProperty::updated_at);
        $circleNewJoyValueObject->updated_at = is_string($updatedAt) ? new Carbon($updatedAt) : $updatedAt;

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

    public function except(array $keys): array
    {
        return Arr::except($this->toArray(), $keys);
    }

    public function toArray(): array
    {
        return [
            CircleNewJoyProperty::id => $this->id,
            CircleNewJoyProperty::circle_id => $this->circle_id,
            CircleNewJoyProperty::title => $this->title,
            CircleNewJoyProperty::description => $this->description,
            CircleNewJoyProperty::url => $this->url,
            CircleNewJoyProperty::private_newjoy_link => $this->private_newjoy_url,
            CircleNewJoyProperty::place_of_activity => $this->place_of_activity,
            CircleNewJoyProperty::place_of_activity_detail => $this->place_of_activity_detail,
            CircleNewJoyProperty::publish_from => $this->publish_from,
            CircleNewJoyProperty::start_date => $this->start_date,
            CircleNewJoyProperty::end_date => $this->end_date,
            CircleNewJoyProperty::release => $this->release,
            CircleNewJoyProperty::created_at => $this->created_at,
            CircleNewJoyProperty::updated_at => $this->updated_at,
        ];
    }
}
