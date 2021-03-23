<?php

namespace App\Auth;

use App\Enum\Property\UserProperty;
use App\Models\CircleUser;
use App\Models\User;
use Illuminate\Auth\TokenGuard;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;

class CircleUserTokenGuard extends TokenGuard
{
    /**
     * The currently authenticated user.
     *
     * @var User
     */
    protected $user;

    protected ?Collection $circleUsers = null;

    /**
     * Get the currently authenticated user.
     *
     * @return User|null
     */
    public function user()
    {
        Log::debug("CircleUserTokenGuard#user");

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

        $this->user = $user;

        if (is_null($this->circleUsers())) {
            $this->user = null;
            $this->circleUsers = null;
            return null;
        }

        return $this->user;
    }

    /**
     * Get the currently authenticated user.
     *
     * @return Collection|null
     */
    public function circleUsers(): ?Collection
    {
        Log::debug("CircleUserTokenGuard#circleUsers");

        // If we've already retrieved the user for the current request we can just
        // return it back immediately. We do not want to fetch the user data on
        // every call to this method because that would be tremendously slow.
        if (!is_null($this->circleUsers)) {
            return $this->circleUsers;
        }

        if (is_null($this->user)) {
            return null;
        }

        Log::debug("CircleUserTokenGuard#val", [
            'user' => $this->user,
        ]);

        $circleUsers = $this->user->circleUsers;

        return $this->circleUsers = $circleUsers;
    }
}
