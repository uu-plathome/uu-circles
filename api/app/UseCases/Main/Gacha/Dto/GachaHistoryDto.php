<?php

declare(strict_types=1);

namespace App\UseCases\Main\Gacha\Dto;

use App\Models\Circle;
use App\Models\CircleGachaResult;
use Illuminate\Database\Eloquent\Collection;

final class GachaHistoryDto
{
    /**
     * @var GachaHistoryItemDto[]
     */
    public array $list;

    public static function byEloquent(
        Collection $circles,
        Collection $circleGachaResults
    ): self {
        $dto = new self();

        $dto->list = $circleGachaResults->map(
            fn (CircleGachaResult $circleGachaResult) => GachaHistoryItemDto::byEloquent(
                $circles->filter(
                    fn (Circle $circle) => in_array($circle->id, json_decode($circleGachaResult->result_circle_ids))
                )->values(),
                $circleGachaResult
            )
        )->toArray();

        return $dto;
    }

    public function toArray(): array
    {
        return [
            'list'                            => (new \Illuminate\Support\Collection($this->list))->map(
                fn (GachaHistoryItemDto $dto) => $dto->toArray()
            )->toArray(),
        ];
    }
}
