<?php

declare(strict_types=1);

namespace App\UseCases\AdminManagement\CircleTag\Params;

final class CreateOrUpdateCircleTagUsecaseParam
{
    public int $circle_id;
    public bool $sport = false;
    public bool $music = false;
    public bool $culture = false;
    public bool $volunteer = false;
    public bool $nature = false;
    public bool $international = false;
    public bool $incare = false;
    public bool $loose = false;
    public bool $community = false;
    public bool $programming = false;
    public bool $urgent_recruitment = false;
    public bool $mystery = false;
}
