<?php

namespace App\ValueObjects;

use App\Enum\Property\UserProperty;
use App\Models\User;
use App\Support\Arr;
use DateTime;
use Illuminate\Support\Carbon;

class CircleUserValueObject
{
    public ?int $id;
    public ?int $circle_id;
    public ?string $username;
    public ?string $email;
    public ?string $display_name;
    public ?string $remember_token;
    public ?string $api_token;
    public ?string $password;
    public ?bool $active;
    public ?DateTime $email_verified_at;
    public ?Carbon $created_at;
    public ?Carbon $updated_at;

    public static function of(array $inputs): CircleUserValueObject
    {
        $circleUserValueObject = new CircleUserValueObject();
        $circleUserValueObject->id = Arr::get($inputs, UserProperty::id);
        $circleUserValueObject->username = Arr::get($inputs, UserProperty::username);
        $circleUserValueObject->email = Arr::get($inputs, UserProperty::email);
        $circleUserValueObject->display_name = Arr::get($inputs, UserProperty::display_name);
        $circleUserValueObject->remember_token = Arr::get($inputs, UserProperty::remember_token);
        $circleUserValueObject->api_token = Arr::get($inputs, UserProperty::api_token);
        $circleUserValueObject->active = Arr::get($inputs, UserProperty::active);
        $circleUserValueObject->password = Arr::get($inputs, UserProperty::password);
        $circleUserValueObject->circle_id = Arr::get($inputs, 'circle_id');

        $emailVerifiedAt = Arr::get($inputs, UserProperty::email_verified_at);
        $circleUserValueObject->email_verified_at = is_string($emailVerifiedAt) ? new Carbon($emailVerifiedAt) : $emailVerifiedAt;

        $createdAt = Arr::get($inputs, UserProperty::created_at);
        $circleUserValueObject->created_at = is_string($createdAt) ? new Carbon($createdAt) : $createdAt;
        $updatedAt = Arr::get($inputs, UserProperty::updated_at);
        $circleUserValueObject->updated_at = is_string($updatedAt) ? new Carbon($updatedAt) : $updatedAt;

        return $circleUserValueObject;
    }

    public static function byEloquent(User $user): CircleUserValueObject
    {
        $adminUser = new CircleUserValueObject();
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
        ];

        if ($isOwn) {
            $baseArr[UserProperty::api_token] = $this->api_token;
            $baseArr[UserProperty::remember_token] = $this->remember_token;
        }

        return $baseArr;
    }
}
