<?php

namespace App\Usecases\AdminManagement\AllUser\Dto;

use App\Models\User;

final class IndexAllUserItemDto
{
    public int $user_id;

    public string $username;

    public string $display_name;

    public string $email;

    public ?string $email_verified_at;

    public bool $active;

    public static function byEloquent(User $user): self
    {
        $dto = new self();
        $dto->user_id = $user->id;
        $dto->username = $user->username;
        $dto->display_name = $user->display_name;
        $dto->email = $user->email;
        $dto->email_verified_at = $user->email_verified_at
            ? $user->email_verified_at->format('Y-m-d H:i:s')
            : null;
        $dto->active = $user->active;

        return $dto;
    }

    public function toArray(): array
    {
        return [
            'id'                => $this->user_id,
            'username'          => $this->username,
            'display_name'      => $this->display_name,
            'email'             => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'active'            => $this->active,
        ];
    }
}
