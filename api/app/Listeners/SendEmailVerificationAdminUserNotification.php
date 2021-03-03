<?php

namespace App\Listeners;

use App\Events\RegisteredAdminUser;

class SendEmailVerificationAdminUserNotification
{
    /**
     * Handle the event.
     *
     * @param RegisteredAdminUser $event
     * @return void
     */
    public function handle(RegisteredAdminUser $event)
    {
        if (!$event->user->hasVerifiedEmail()) {
            $event->user->sendEmailVerificationAdminUserNotification();
        }
    }
}
