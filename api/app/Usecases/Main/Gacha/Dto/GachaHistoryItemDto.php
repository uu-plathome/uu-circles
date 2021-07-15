<?php

declare(strict_types=1);

namespace App\Usecases\Main\Gacha\Dto;

use App\Models\Circle;
use App\Models\CircleGachaResult;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class GachaHistoryItemDto
{
    /**
     * @var GachaSimpleCircleDto[]
     */
    public array $circles;

    public string $gacha_hash;

    public ?Carbon $created_at;

    public static function byEloquent(
        Collection $circles,
        CircleGachaResult $circleGachaResult
    ): self {
        $dto = new self();

        $dto->circles = $circles->filter(
            fn ($circle) => !is_null($circle)
        )->map(
            fn (Circle $circle) => GachaSimpleCircleDto::byEloquent(
                $circle,
                $circle->circleHandbill
            )
        )->values()
            ->toArray();
        $dto->gacha_hash = $circleGachaResult->gacha_hash;
        $dto->created_at = $circleGachaResult->created_at instanceof Carbon
            ? $circleGachaResult->created_at
            : null;

        return $dto;
    }

    public function toArray(): array
    {
        return [
            'result_circles'                   => (new Collection($this->circles))->map(
                fn (GachaSimpleCircleDto $dto) => $dto->toArray()
            )->toArray(),
            'gacha_hash' => $this->gacha_hash,
            'created_at' => $this->created_at ? $this->created_at->format('Y-m-d') : null,
        ];
    }
}
