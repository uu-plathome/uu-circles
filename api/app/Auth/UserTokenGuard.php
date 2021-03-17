<?php

namespace App\Auth;

use App\Enum\Property\UserProperty;
use App\Models\AdminUser;
use App\Models\CircleUser;
use App\Models\User;
use Illuminate\Auth\TokenGuard;

class UserTokenGuard extends TokenGuard
{
    protected ?AdminUser $adminUser = null;

    protected ?CircleUser $circleUser = null;

    /**
     * Get the currently authenticated user.
     *
     * @return User|\Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function user()
    {
        // If we've already retrieved the user for the current request we can just
        // return it back immediately. We do not want to fetch the user data on
        // every call to this method because that would be tremendously slow.
        if (!is_null($this->user)) {
            return $this->user;
        }

        $user = null;

        $token = $this->getTokenForRequest();

        if (!empty($token)) {
            $user = $this->provider->retrieveByCredentials([
                $this->storageKey    => $this->hash ? hash('sha256', $token) : $token,
                UserProperty::active => true
            ]);
        }

        return $this->user = $user;
    }

    /**
     * Get the currently authenticated user.
     *
     * @return AdminUser|null
     */
    public function adminUser(): ?AdminUser
    {
        // If we've already retrieved the user for the current request we can just
        // return it back immediately. We do not want to fetch the user data on
        // every call to this method because that would be tremendously slow.
        if (!is_null($this->adminUser)) {
            return $this->adminUser;
        }

        $adminUser = $this->user->adminUser;

        return $this->adminUser = $adminUser;
    }

    /**
     * Get the currently authenticated user.
     *
     * @return CircleUser|null
     */
    public function circleUser(): ?CircleUser
    {
        // If we've already retrieved the user for the current request we can just
        // return it back immediately. We do not want to fetch the user data on
        // every call to this method because that would be tremendously slow.
        if (!is_null($this->circleUser)) {
            return $this->circleUser;
        }

        $circleUser = $this->user->circleUser;

        return $this->circleUser = $circleUser;
    }
}
