<?php

namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Auth\Notifications\VerifyEmail as Notification;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;

class VerifyEmailCircleUser extends Notification
{
    /**
     * Get the verification URL for the given notifiable.
     *
     * @param mixed $notifiable
     *
     * @return string
     */
    protected function verificationUrl($notifiable): string
    {
        Log::debug('VerifyEmailCircleUser', [
            'notifiable' => $notifiable,
        ]);

        $appUrl = Config::get('app.circle_url').'/auth';

        $url = URL::temporarySignedRoute(
            'circle.verification.verify',
            Carbon::now()->addWeek(),
            ['userId' => $notifiable->id]
        );

        return str_replace(url('/circle/api'), $appUrl, $url);
    }
}
