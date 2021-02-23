<?php

namespace App\ValueObjects;

use App\Enum\Property\AdminUserProperty;
use App\Enum\UserModel;
use App\Models\AdminUser;
use App\Models\User;
use App\Support\Arr;
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
    public ?string $role;
    public ?DateTime $email_verified_at;
    public ?Carbon $created_at;
    public ?Carbon $updated_at;

    public static function byEloquent(User $user, AdminUser $adminUser): AdminUserValueObject
    {
        $adminUserValueObject = new AdminUserValueObject();
        $adminUserValueObject->id = $user->id;
        $adminUserValueObject->display_name = $user->display_name;
        $adminUserValueObject->username = $user->username;
        $adminUserValueObject->email = $user->email;
        $adminUserValueObject->remember_token = $user->remember_token;
        $adminUserValueObject->api_token = $user->api_token;
        $adminUserValueObject->active = $user->active;
        $adminUserValueObject->email_verified_at = $user->email_verified_at;
        $adminUserValueObject->created_at = $user->created_at;
        $adminUserValueObject->updated_at = $user->updated_at;
        $adminUserValueObject->role = $adminUser->role;
        return $adminUserValueObject;
    }

    public static function of(array $inputs): AdminUserValueObject
    {
        $adminUserValueObject = new AdminUserValueObject();
        $adminUserValueObject->id = Arr::get($inputs, UserModel::id);
        $adminUserValueObject->username = Arr::get($inputs, UserModel::username);
        $adminUserValueObject->email = Arr::get($inputs, UserModel::email);
        $adminUserValueObject->display_name = Arr::get($inputs, UserModel::display_name);
        $adminUserValueObject->remember_token = Arr::get($inputs, UserModel::remember_token);
        $adminUserValueObject->api_token = Arr::get($inputs, UserModel::api_token);
        $adminUserValueObject->active = Arr::get($inputs, UserModel::active);
        $adminUserValueObject->password = Arr::get($inputs, UserModel::password);

        $emailVerifiedAt = Arr::get($inputs, UserModel::email_verified_at);
        $adminUserValueObject->email_verified_at = is_string($emailVerifiedAt) ? new Carbon($emailVerifiedAt) : $emailVerifiedAt;

        $createdAt = Arr::get($inputs, UserModel::created_at);
        $adminUserValueObject->created_at = is_string($createdAt) ? new Carbon($createdAt) : $createdAt;
        $updatedAt = Arr::get($inputs, UserModel::updated_at);
        $adminUserValueObject->updated_at = is_string($updatedAt) ? new Carbon($updatedAt) : $updatedAt;

        $adminUserValueObject->role = Arr::get($inputs, AdminUserProperty::role);

        return $adminUserValueObject;
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
            AdminUserProperty::role       => $this->role,
        ];

        if ($isOwn) {
            $baseArr[UserModel::api_token] = $this->api_token;
            $baseArr[UserModel::remember_token] = $this->remember_token;
        }

        return $baseArr;
    }
}
