<?php

namespace App\Usecases\Admin\AllUser\Params;

class IndexAllUserUsecaseParam
{
    public ?int $id;
    public ?string $updated_at;
    public bool $previos;
    public bool $next;
    public ?string $search;
}
