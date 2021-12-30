<?php

declare(strict_types=1);

namespace App\UseCases\Main\Circle\Dto;

use App\Entity\CircleTagEntity;
use App\ValueObjects\CircleValueObject;

final class MainDetailCircleDto
{
    public CircleValueObject $circleValueObject;
    public CircleTagEntity $circleTagEntity;
}
