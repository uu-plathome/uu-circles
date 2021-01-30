<?php

namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Auth\Notifications\VerifyEmail as Notification;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\URL;

class VerifyEmailCircleUser extends Notification
{
    /**
     * Get the verification URL for the given notifiable.
     *
     * @param  mixed  $notifiable
     * @return string
     */
    protected function verificationUrl($notifiable): string
    {
        // $appUrl = Config::get('app.client_url');
        $appUrl = Config::get('app.admin_url') . '/auth/circle';

        $url = URL::temporarySignedRoute(
            'verification.verify', Carbon::now()->addWeek(), ['userId' => $notifiable->id]
        );

        return str_replace(url('/api'), $appUrl, $url);
    }
}
