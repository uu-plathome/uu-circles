<?php

namespace App\ValueObjects;

use App\Enum\UserModel;
use App\Models\User;
use DateTime;
use Illuminate\Support\Carbon;

class AdminUserValueObject
{
    public ?int $id;
    public ?string $username;
    public ?string $email;
    public ?string $display_name;
    public ?string $remember_token;
    public ?string $password;
    public ?string $api_token;
    public ?bool $active;
    public ?DateTime $email_verified_at;
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
        $adminUser->active = $user->active;
        $adminUser->email_verified_at = $user->email_verified_at;
        $adminUser->created_at = $user->created_at;
        $adminUser->updated_at = $user->updated_at;
        return $adminUser;
    }

    public function toUserModel(): User
    {
        $user = new User([
            UserModel::username       => $this->username,
            UserModel::display_name   => $this->display_name,
            UserModel::email          => $this->email,
            UserModel::api_token      => $this->api_token,
            UserModel::active         => $this->active,
            UserModel::remember_token => $this->remember_token,
        ]);
        $user->id = $this->id;
        return $user;
    }

    /**
     * @param bool $isOwn 自分自身のアカウントかどうか
     * @return array
     */
    public function toArray(bool $isOwn = false): array
    {
        $baseArr = [
            UserModel::id                => $this->id,
            UserModel::username          => $this->username,
            UserModel::display_name      => $this->display_name,
            UserModel::active            => $this->active,
            UserModel::email             => $this->email,
            UserModel::email_verified_at => $this->email_verified_at,
        ];

        if ($isOwn) {
            $baseArr[UserModel::api_token] = $this->api_token;
            $baseArr[UserModel::remember_token] = $this->remember_token;
        }

        return $baseArr;
    }
}
