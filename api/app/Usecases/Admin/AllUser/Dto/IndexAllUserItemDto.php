<?php

namespace App\Usecases\Admin\AllUser\Dto;

use App\Models\User;
use JetBrains\PhpStorm\ArrayShape;

final class IndexAllUserItemDto
{
    public int $user_id;

    public string $username;

    public string $display_name;

    public string $email;

    public ?string $email_verified_at;

    public bool $active;

    // 所属サークル数
    public int $circle_user_count;

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
        $dto->circle_user_count = $user->circleUsers 
            ? $user->circleUsers->count()  
            : 0;

        return $dto;
    }

    #[ArrayShape([
        'id' => "int",
        'username' => "string",
        'display_name' => "string",
        'email' => "string",
        'email_verified_at' => "null|string",
        'active' => "bool",
        'circle_user_count' => "int"])]
    public function toArray(): array
    {
        return [
            'id'                => $this->user_id,
            'username'          => $this->username,
            'display_name'      => $this->display_name,
            'email'             => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'active'            => $this->active,
            'circle_user_count' => $this->circle_user_count,
        ];
    }
}
