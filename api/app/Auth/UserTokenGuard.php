<?php

namespace App\Auth;

use App\Enum\UserModel;
use App\Models\User;
use Illuminate\Auth\TokenGuard;
use App\Auth\UserProvider;
use Illuminate\Http\Request;

class UserTokenGuard extends TokenGuard
{
    public function __construct(
        UserProvider $provider,
        Request $request,
        $inputKey = 'api_token',
        $storageKey = 'api_token',
        $hash = false
    ) {
        $this->hash = $hash;
        $this->request = $request;
        $this->provider = $provider;
        $this->inputKey = $inputKey;
        $this->storageKey = $storageKey;
    }

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
        if (! is_null($this->user)) {
            return $this->user;
        }

        $user = null;

        $token = $this->getTokenForRequest();

        if (! empty($token)) {
            $user = $this->provider->retrieveByCredentials([
                $this->storageKey => $this->hash ? hash('sha256', $token) : $token,
                UserModel::active => true
            ]);
        }

        return $this->user = $user;
    }
}
