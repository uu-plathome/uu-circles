<?php

declare(strict_types=1);

namespace App\Usecases\Main\Gacha\Params;

final class DrawGachaUsecaseParam
{
    public int $drawCount;
    public string $identifierHash;
}