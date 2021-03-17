<?php

namespace App\Dto;

use App\Entity\CircleTagEntity;
use App\ValueObjects\CircleValueObject;

class MainDetailCircleDto
{
    public CircleValueObject $circleValueObject;
    public CircleTagEntity $circleTagEntity;
}
