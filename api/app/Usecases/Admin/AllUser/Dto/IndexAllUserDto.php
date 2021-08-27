<?php

namespace App\Usecases\Admin\AllUser\Dto;

use App\Models\User;
use Illuminate\Support\Collection;
use JetBrains\PhpStorm\ArrayShape;

class IndexAllUserDto
{
    /** @var IndexAllUserItemDto[] */
    public array $users;

    public static function byEloquent(Collection $users): self
    {
        $dto = new self();
        $dto->users = $users->map(
            fn (User $user) => IndexAllUserItemDto::byEloquent($user)
        )->toArray();

        return $dto;
    }

    #[ArrayShape(['users' => [
        'id' => "int",
        'username' => "string",
        'display_name' => "string",
        'email' => "string",
        'email_verified_at' => "null|string",
        'active' => "bool",
        'circle_user_count' => "int"]])]
    public function toArray(): array
    {
        return [
            'users'                           => (new Collection($this->users))->map(
                fn (IndexAllUserItemDto $dto) => $dto->toArray()
            )->toArray(),
        ];
    }
}
