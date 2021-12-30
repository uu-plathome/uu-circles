<?php

declare(strict_types=1);

namespace App\Usecases\Main\Gacha\Dto;

use Illuminate\Support\Collection;

/**
 * 一覧用のサークル情報.
 */
final class GachaSimpleCircleListDto
{
    const LIST = 'list';

    /**
     * @var GachaSimpleCircleDto[]
     */
    public array $list;

    public function toArray(): array
    {
        return [
            self::LIST                         => (new Collection($this->list))->map(
                fn (GachaSimpleCircleDto $dto) => $dto->toArray()
            )->toArray(),
        ];
    }
}
