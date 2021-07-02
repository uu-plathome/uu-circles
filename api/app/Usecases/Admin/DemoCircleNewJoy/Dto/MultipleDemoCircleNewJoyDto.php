<?php

namespace App\Usecases\Admin\DemoCircleNewJoy\Dto;

use App\Models\DemoCircleNewjoy;
use Illuminate\Database\Eloquent\Collection;

final class MultipleDemoCircleNewJoyDto
{
    /**
     * @var DemoCircleDto[]
     */
    public array $demoCircles;

    /**
     * @param Collection $collection
     * @return static
     */
    public static function byEloquent(
        Collection $collection
    ): self {
        $dto = new self();

        $dto->demoCircles = $collection->map(
            fn (DemoCircleNewjoy $demoCircleNewJoy) => DemoCircleDto::byEloquent(
                $demoCircleNewJoy->circle,
                $demoCircleNewJoy
            )
        )->toArray();

        return $dto;
    }

    public function toArray(): array
    {
        return [];
    }
}
