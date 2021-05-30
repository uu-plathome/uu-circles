<?php

declare(strict_types=1);

namespace App\Usecases\Admin\AllUser\Params;

final class IndexAllUserUsecaseParam
{
    public ?int $id;
    public ?string $updated_at;
    public bool $previos;
    public bool $next;
    public ?string $search;
}
