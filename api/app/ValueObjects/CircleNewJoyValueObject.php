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
    public ?Carbon $start_date;
    public ?Carbon $end_date;
    public ?bool $release;
    public ?Carbon $created_at;
    public ?Carbon $updated_at;

    public static function of(array $inputs): CircleNewJoyValueObject
    {
        $circleNewJoyValueObject = new CircleNewJoyValueObject();
        $circleNewJoyValueObject->id = Arr::get($inputs, CircleNewJoyModel::id);
        $circleNewJoyValueObject->circle_id = Arr::get($inputs, CircleNewJoyModel::circle_id);
        $circleNewJoyValueObject->title = Arr::get($inputs, CircleNewJoyModel::title);
        $circleNewJoyValueObject->description = Arr::get($inputs, CircleNewJoyModel::description);
        $circleNewJoyValueObject->url = Arr::get($inputs, CircleNewJoyModel::url);
        $circleNewJoyValueObject->place_of_activity = Arr::get($inputs, CircleNewJoyModel::place_of_activity);
        $circleNewJoyValueObject->place_of_activity_detail = Arr::get($inputs, CircleNewJoyModel::place_of_activity_detail);

        $publishFrom = Arr::get($inputs, CircleNewJoyModel::publish_from);
        $circleNewJoyValueObject->publish_from = is_string($publishFrom) ? new Carbon($publishFrom) : $publishFrom;

        $startDate = Arr::get($inputs, CircleNewJoyModel::start_date);
        $circleNewJoyValueObject->start_date = is_string($startDate) ? new Carbon($startDate) : $startDate;

        $endDate = Arr::get($inputs, CircleNewJoyModel::end_date);
        $circleNewJoyValueObject->end_date = is_string($endDate) ? new Carbon($endDate) : $endDate;
        $circleNewJoyValueObject->release = Arr::get($inputs, CircleNewJoyModel::release);

        $createdAt = Arr::get($inputs, CircleNewJoyModel::created_at);
        $circleNewJoyValueObject->created_at = is_string($createdAt) ? new Carbon($createdAt) : $createdAt;
        $updatedAt = Arr::get($inputs, CircleNewJoyModel::updated_at);
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
            CircleNewJoyModel::id => $this->id,
            CircleNewJoyModel::circle_id => $this->circle_id,
            CircleNewJoyModel::title => $this->title,
            CircleNewJoyModel::description => $this->description,
            CircleNewJoyModel::url => $this->url,
            CircleNewJoyModel::place_of_activity => $this->place_of_activity,
            CircleNewJoyModel::place_of_activity_detail => $this->place_of_activity_detail,
            CircleNewJoyModel::publish_from => $this->publish_from,
            CircleNewJoyModel::start_date => $this->start_date,
            CircleNewJoyModel::end_date => $this->end_date,
            CircleNewJoyModel::release => $this->release,
            CircleNewJoyModel::created_at => $this->created_at,
            CircleNewJoyModel::updated_at => $this->updated_at,
        ];
    }
}
