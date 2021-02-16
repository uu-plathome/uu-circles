<?php

namespace App\Usecases\Main\Circle\Params;

class SearchCategoryCircleListParam
{
    public bool $officialOrganization = false;
    public bool $unofficialOrganization = false;
    public bool $sendingOrganization = false;
    public bool $studentGroup = false;
    public bool $club = false;
}
