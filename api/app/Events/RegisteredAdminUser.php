<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Queue\SerializesModels;

class RegisteredAdminUser
{
    use SerializesModels;

    /**
     * The authenticated user.
     *
     * @var User
     */
    public User $user;

    /**
     * Create a new event instance.
     *
     * @param User $user
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
