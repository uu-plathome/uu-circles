<?php

namespace App\Http\Controllers\Admin\AllUser\Dto;

use App\Models\User;
use Illuminate\Support\Collection;

class IndexAllUserDto
{
    public array $users;

    public static function byEloquent(Collection $users): self
    {
        $dto = new self();
        $dto->users = $users->map(
            fn (User $user) => IndexAllUserItemDto::byEloquent($user)
        )->toArray();

        return $dto;
    }

    public function toArray(): array
    {
        return [
            'users'                           => (new Collection($this->users))->map(
                fn (IndexAllUserItemDto $dto) => $dto->toArray()
            )->toArray(),
        ];
    }
}
