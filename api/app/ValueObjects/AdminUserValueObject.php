<?php

namespace App\ValueObjects;

use App\Models\User;
use Illuminate\Support\Carbon;

class AdminUserValueObject
{
    public int $id;
    public string $username;
    public string $email;
    public ?string $display_name;
    public ?string $remember_token;
    public ?string $password;
    public ?string $api_token;
    public ?Carbon $created_at;
    public ?Carbon $updated_at;

    public static function byEloquent(User $user): AdminUserValueObject
    {
        $adminUser = new AdminUserValueObject();
        $adminUser->id = $user->id;
        $adminUser->display_name = $user->display_name;
        $adminUser->username = $user->username;
        $adminUser->email = $user->email;
        $adminUser->remember_token = $user->remember_token;
        $adminUser->api_token = $user->api_token;
        $adminUser->created_at = $user->created_at;
        $adminUser->updated_at = $user->updated_at;
        return $adminUser;
    }

    public function toUserModel(): User
    {
        return new User([
            'id'             => $this->id,
            'username'       => $this->username,
            'display_name'   => $this->display_name,
            'email'          => $this->email,
            'api_token'      => $this->api_token,
            'password'       => $this->password,
            'remember_token' => $this->remember_token,
        ]);
    }
}
