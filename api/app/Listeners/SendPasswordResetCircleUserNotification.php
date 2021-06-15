<?php

namespace App\Listeners;

use App\Events\PasswordResetCircleUser;

class SendPasswordResetCircleUserNotification
{
    /**
     * Handle the event.
     *
     * @param PasswordResetCircleUser $event
     *
     * @return void
     */
    public function handle(PasswordResetCircleUser $event)
    {
        if (!$event->user->hasVerifiedEmail()) {
            $event->user->sendEmailVerificationAdminUserNotification();
        }
    }
}
