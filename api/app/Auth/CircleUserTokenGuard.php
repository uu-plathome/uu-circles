<?php

namespace App\Auth;

use App\Enum\Property\UserProperty;
use App\Models\CircleUser;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\TokenGuard;

class CircleUserTokenGuard extends TokenGuard
{
    /**
     * The currently authenticated user.
     *
     * @var User
     */
    protected $user;

    protected ?CircleUser $circleUsers = null;

    /**
     * Get the currently authenticated user.
     *
     * @return User|null
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

            if ($this->circleUsers() === null) {
                return abort(400);
            }
        }

        return $this->user = $user;
    }

    /**
     * Get the currently authenticated user.
     *
     * @return CircleUser|null
     */
    public function circleUsers(): ?CircleUser
    {
        // If we've already retrieved the user for the current request we can just
        // return it back immediately. We do not want to fetch the user data on
        // every call to this method because that would be tremendously slow.
        if (!is_null($this->circleUsers)) {
            return $this->circleUsers;
        }

        /** @var \App\Models\CircleUser $circleUsers */
        $circleUsers = $this->user->circleUsers;

        return $this->circleUsers = $circleUsers;
    }
}
