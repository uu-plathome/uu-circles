<?php

namespace App\Usecases\Admin\Params;

class PaginateCircleUsecaseParams
{
    public ?int $id;
    public ?string $updated_at;
    public bool $previos;
    public bool $next;
}
