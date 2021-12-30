<?php

declare(strict_types=1);

namespace App\UseCases\AdminManagement\CircleUser\Params;

final class CreateCircleUserUsecaseParam
{
    public int $circle_id;
    public ?string $display_name = null;
    public string $username;
    public string $email;
    public string $role;
}
