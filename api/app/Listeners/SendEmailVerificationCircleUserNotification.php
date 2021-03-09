<?php

namespace App\Listeners;

use App\Events\RegisteredCircleUser;

class SendEmailVerificationCircleUserNotification
{
    /**
     * Handle the event.
     *
     * @param RegisteredCircleUser $event
     * @return void
     */
    public function handle(RegisteredCircleUser $event)
    {
        if (!$event->user->hasVerifiedEmail()) {
            $event->user->sendEmailVerificationCircleUserNotification();
        }
    }
}
