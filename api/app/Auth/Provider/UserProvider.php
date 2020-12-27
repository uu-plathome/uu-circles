<?php

namespace App\Auth\Provider;

use App\Models\User;
use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Contracts\Hashing\Hasher as HasherContract;
use Illuminate\Contracts\Auth\UserProvider as IlluminateUserProvider;

class UserProvider extends EloquentUserProvider implements IlluminateUserProvider
{
    public function __construct(HasherContract $hasher, User $model)
    {
        parent::__construct($hasher, $model);
    }
}
