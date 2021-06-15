<?php

namespace App\ValueObjects;

use App\Enum\Property\CircleUserProperty;
use App\Enum\Property\UserProperty;
use App\Models\CircleUser;
use App\Models\User;
use DateTime;
use Illuminate\Support\Carbon;

class CircleUserDetailValueObject
{
    public ?int $id;
    public ?int $circle_id;
    public ?string $username;
    public ?string $email;
    public ?string $display_name;
    public ?string $remember_token;
    public ?string $api_token;
    public ?string $password;
    /**
     * @var \App\Enum\Role|null
     */
    public ?string $role;
    public ?bool $active;
    public ?DateTime $email_verified_at;
    public ?Carbon $created_at;
    public ?Carbon $updated_at;

    public static function byEloquent(User $user, int $circleId): CircleUserDetailValueObject
    {
        $cuv = new CircleUserDetailValueObject();
        $cuv->id = $user->id;
        $cuv->circle_id = $user->circleId;
        $cuv->display_name = $user->display_name;
        $cuv->username = $user->username;
        $cuv->email = $user->email;
        $cuv->remember_token = $user->remember_token;
        $cuv->api_token = $user->api_token;
        $cuv->active = $user->active;
        $cuv->email_verified_at = $user->email_verified_at;
        $cuv->created_at = $user->created_at;
        $cuv->updated_at = $user->updated_at;
        $cuv->role = $user->circleUsers->first(
            fn (CircleUser $circleUser) => $circleUser->circle_id === $circleId
        )->role;

        return $cuv;
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
            CircleUserProperty::circle_id   => $this->circle_id,
            CircleUserProperty::role        => $this->role,
        ];

        if ($isOwn) {
            $baseArr[UserProperty::api_token] = $this->api_token;
            $baseArr[UserProperty::remember_token] = $this->remember_token;
        }

        return $baseArr;
    }
}
