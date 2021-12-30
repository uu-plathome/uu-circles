<?php

declare(strict_types=1);

namespace App\UseCases\AdminManagement\CircleUser\Params;

final class UpdateCircleUserUsecaseParam
{
    public int $user_id;
    public int $circle_id;
    public ?string $display_name = null;
    public string $username;
    public bool $active;
    public string $role;
}
