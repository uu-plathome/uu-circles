<?php

namespace App\ValueObjects;

use App\Enum\Property\AdminUserProperty;
use App\Enum\Property\UserProperty;
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
        $adminUserValueObject->id = Arr::get($inputs, UserProperty::id);
        $adminUserValueObject->username = Arr::get($inputs, UserProperty::username);
        $adminUserValueObject->email = Arr::get($inputs, UserProperty::email);
        $adminUserValueObject->display_name = Arr::get($inputs, UserProperty::display_name);
        $adminUserValueObject->remember_token = Arr::get($inputs, UserProperty::remember_token);
        $adminUserValueObject->api_token = Arr::get($inputs, UserProperty::api_token);
        $adminUserValueObject->active = Arr::get($inputs, UserProperty::active);
        $adminUserValueObject->password = Arr::get($inputs, UserProperty::password);

        $emailVerifiedAt = Arr::get($inputs, UserProperty::email_verified_at);
        $adminUserValueObject->email_verified_at = is_string($emailVerifiedAt) ? new Carbon($emailVerifiedAt) : $emailVerifiedAt;

        $createdAt = Arr::get($inputs, UserProperty::created_at);
        $adminUserValueObject->created_at = is_string($createdAt) ? new Carbon($createdAt) : $createdAt;
        $updatedAt = Arr::get($inputs, UserProperty::updated_at);
        $adminUserValueObject->updated_at = is_string($updatedAt) ? new Carbon($updatedAt) : $updatedAt;

        $adminUserValueObject->role = Arr::get($inputs, AdminUserProperty::role);

        return $adminUserValueObject;
    }

    public function toUserProperty(): User
    {
        $user = new User([
            UserProperty::username       => $this->username,
            UserProperty::display_name   => $this->display_name,
            UserProperty::email          => $this->email,
            UserProperty::api_token      => $this->api_token,
            UserProperty::active         => $this->active,
            UserProperty::remember_token => $this->remember_token,
        ]);
        $user->id = $this->id;

        return $user;
    }

    /**
     * @param bool $isOwn 自分自身のアカウントかどうか
     *
     * @return array
     */
    public function toArray(bool $isOwn = false): array
    {
        $baseArr = [
            UserProperty::id                => $this->id,
            UserProperty::username          => $this->username,
            UserProperty::display_name      => $this->display_name,
            UserProperty::active            => $this->active,
            UserProperty::email             => $this->email,
            UserProperty::email_verified_at => $this->email_verified_at,
            AdminUserProperty::role         => $this->role,
        ];

        if ($isOwn) {
            $baseArr[UserProperty::api_token] = $this->api_token;
            $baseArr[UserProperty::remember_token] = $this->remember_token;
        }

        return $baseArr;
    }
}
