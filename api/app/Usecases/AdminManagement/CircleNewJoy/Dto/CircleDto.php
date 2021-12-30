<?php

namespace App\Usecases\Admin\CircleNewJoy\Dto;

use App\Models\Circle;
use App\Models\CircleNewJoy;

final class CircleDto
{
    public int $circle_id;
    public string $name;
    public CircleNewJoyDto $circleNewJoy;

    public static function byEloquent(
        Circle $circle,
        CircleNewJoy $circleNewJoy
    ): self {
        $dto = new self();

        $dto->circle_id = $circle->id;
        $dto->name = $circle->name;
        $dto->circleNewJoy = CircleNewJoyDto::byEloquent($circleNewJoy);

        return $dto;
    }

    public function toArray(): array
    {
        return [
            'circle_id'           => $this->circle_id,
            'name'                => $this->name,
            'circle_new_joy'      => $this->circleNewJoy->toArray(),
        ];
    }
}
