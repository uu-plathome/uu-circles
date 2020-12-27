<?php

namespace App\ValueObjects;

use App\Models\Circle;
use Illuminate\Support\Carbon;

class CircleValueObject
{
    public ?int $id;
    public ?string $slug;
    public bool $release;
    public ?Carbon $created_at;
    public ?Carbon $updated_at;

    public static function byEloquent(Circle $circle): CircleValueObject
    {
        $circleValueObject = new CircleValueObject();
        $circleValueObject->id = $circle->id;
        $circleValueObject->slug = $circle->slug;
        $circleValueObject->release = $circle->release;
        $circleValueObject->created_at = $circle->created_at;
        $circleValueObject->updated_at = $circle->updated_at;
        return $circleValueObject;
    }

    public function toCircleModel(): Circle
    {
        return new Circle([
            'id'         => $this->id,
            'slug'       => $this->slug,
            'release'    => $this->release,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ]);
    }
}
