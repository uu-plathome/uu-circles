<?php

declare(strict_types=1);

namespace App\Usecases\Main\Circle\Dto;

use Illuminate\Support\Collection;

/**
 * 一覧用のサークル情報.
 */
final class MainSimpleCircleListDto
{
    const LIST = 'list';

    /**
     * @var MainSimpleCircleDto[]
     */
    public array $list;

    public function toArray(): array
    {
        return [
            self::LIST                        => (new Collection($this->list))->map(
                fn (MainSimpleCircleDto $dto) => $dto->toArray()
            )->toArray(),
        ];
    }
}
