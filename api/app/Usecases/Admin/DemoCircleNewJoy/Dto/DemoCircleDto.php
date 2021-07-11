<?php

namespace App\Usecases\Admin\DemoCircleNewJoy\Dto;

use App\Models\Circle;
use App\Models\DemoCircleNewjoy;

final class DemoCircleDto
{
    public int $circle_id;
    public string $name;
    public DemoCircleNewJoyDto $demoCircleNewJoy;

    public static function byEloquent(
        Circle $circle,
        DemoCircleNewjoy $demoCircleNewJoy
    ): self {
        $dto = new self();

        $dto->circle_id = $circle->id;
        $dto->name = $circle->name;
        $dto->demoCircleNewJoy = DemoCircleNewJoyDto::byEloquent($demoCircleNewJoy);

        return $dto;
    }

    public function toArray(): array
    {
        return [
            'circle_id'           => $this->circle_id,
            'name'                => $this->name,
            'demo_circle_new_joy' => $this->demoCircleNewJoy->toArray(),
        ];
    }
}
