<?php

namespace App\Usecases\Admin\CircleUser\Params;

class UpdateCircleUserUsecaseParam
{
    public int $user_id;
    public int $circle_id;
    public ?string $display_name = null;
    public string $username;
    public string $email;
    public string $role;
}
