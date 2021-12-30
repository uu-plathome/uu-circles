<?php

declare(strict_types=1);

namespace App\Usecases\Main\Circle\Params;

final class SearchCategoryCircleListParam
{
    public bool $officialOrganization = false;
    public bool $unofficialOrganization = false;
    public bool $sendingOrganization = false;
    public bool $studentGroup = false;
    public bool $club = false;
}
