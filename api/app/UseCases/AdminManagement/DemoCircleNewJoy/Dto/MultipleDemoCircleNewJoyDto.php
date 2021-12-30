<?php

namespace App\UseCases\AdminManagement\DemoCircleNewJoy\Dto;

use App\Models\DemoCircleNewjoy;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;

final class MultipleDemoCircleNewJoyDto
{
    /**
     * @var DemoCircleDto[]
     */
    public array $demoCircles;

    /**
     * @param Collection $collection
     *
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
        return (new SupportCollection($this->demoCircles))->map(
            fn (DemoCircleDto $demoCircleDto) => $demoCircleDto->toArray()
        )->toArray();
    }
}
