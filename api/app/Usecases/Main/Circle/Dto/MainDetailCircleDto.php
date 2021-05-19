<?php

namespace App\Usecases\Main\Circle\Dto;

use App\Entity\CircleTagEntity;
use App\ValueObjects\CircleValueObject;

class MainDetailCircleDto
{
    public CircleValueObject $circleValueObject;
    public CircleTagEntity $circleTagEntity;
}
