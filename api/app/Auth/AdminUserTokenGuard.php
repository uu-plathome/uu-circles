<?php

namespace App\Auth;

use App\Enum\Property\UserProperty;
use App\Models\AdminUser;
use App\Models\CircleUser;
use App\Models\User;
use Illuminate\Auth\TokenGuard;
use Illuminate\Support\Facades\Log;

class AdminUserTokenGuard extends TokenGuard
{
    /**
     * The currently authenticated user.
     *
     * @var User
     */
    protected $user;

    protected ?AdminUser $adminUser = null;

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

        Log::debug("CircleUserTokenGuard#user val", [
            'user' => $user,
        ]);

        $this->user = $user;
        if (is_null($this->adminUser())) {
            $this->user = null;
            $this->adminUser = null;
            return null;
        }

        return $this->user;
    }

    /**
     * Get the currently authenticated user.
     *
     * @return AdminUser|null
     */
    public function adminUser(): ?AdminUser
    {
        Log::debug("CircleUserTokenGuard#adminUser");

        // If we've already retrieved the user for the current request we can just
        // return it back immediately. We do not want to fetch the user data on
        // every call to this method because that would be tremendously slow.
        if (!is_null($this->adminUser)) {
            return $this->adminUser;
        }

        if (is_null($this->user)) {
            return null;
        }

        $adminUser = $this->user->adminUser;

        Log::debug("CircleUserTokenGuard#adminUser val", [
            'user'      => $this->user,
            'adminUser' => $adminUser,
        ]);

        return $this->adminUser = $adminUser;
    }
}
