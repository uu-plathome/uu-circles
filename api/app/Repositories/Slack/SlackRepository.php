<?php

namespace App\Repositories\Slack;

use App\Notifications\SlackNotification;
use Illuminate\Notifications\Notifiable;

class SlackRepository
{
    use Notifiable;

    /**
     * 通知チャンネル情報.
     *
     * @var array
     */
    protected $channel = null;

    /**
     * 通知チャンネルを指定.
     *
     * @param array $channnel
     *
     * @return $this
     */
    public function channel($channel)
    {
        $this->channel = config('slack.channels.'.$channel);

        return $this;
    }

    /**
     * 通知処理.
     *
     * @param string $message
     *
     * @return void
     */
    public function send($message = null)
    {
        if (!isset($this->channel)) {
            $this->channel(config('slack.default'));
        }

        $this->notify(new SlackNotification($this->channel, $message));
    }

    /**
     * Slack通知用URLを指定する.
     *
     * @return string
     */
    protected function routeNotificationForSlack()
    {
        return config('slack.url');
    }
}
