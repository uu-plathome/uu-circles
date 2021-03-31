<?php

namespace App\Usecases\CircleManagement\CircleUser\Params;

class CreateCircleUserUsecaseParam
{
    public int $circle_id;
    public ?string $display_name = null;
    public string $username;
    public string $email;
    public string $role;
}
