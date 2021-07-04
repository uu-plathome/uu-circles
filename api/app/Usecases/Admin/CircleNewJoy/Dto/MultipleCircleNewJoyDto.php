<?php

namespace App\Usecases\Admin\CircleNewJoy\Dto;

use App\Models\CircleNewJoy;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;

final class MultipleCircleNewJoyDto
{
    /**
     * @var DemoCircleDto[]
     */
    public array $circles;

    /**
     * @param Collection $collection
     *
     * @return static
     */
    public static function byEloquent(
        Collection $collection
    ): self {
        $dto = new self();

        $dto->circles = $collection->map(
            fn (CircleNewJoy $demoCircleNewJoy) => CircleDto::byEloquent(
                $demoCircleNewJoy->circle,
                $demoCircleNewJoy
            )
        )->toArray();

        return $dto;
    }

    public function toArray(): array
    {
        return (new SupportCollection($this->circles))->map(
            fn (CircleDto $circleDto) => $circleDto->toArray()
        )->toArray();
    }
}
