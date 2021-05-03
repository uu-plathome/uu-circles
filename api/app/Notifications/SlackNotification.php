<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\SlackMessage;
use Illuminate\Notifications\Messages\SlackAttachment;

class SlackNotification extends Notification
{
    use Queueable;

    /**
     * 通知チャンネル情報
     *
     * @var array
     */
    protected $channel;

    /**
     * 通知メッセージ
     *
     * @var string
     */
    protected $message;

    /**
     * 添付情報
     *
     * @var array
     */
    protected $attachment;

    /**
     * 通知インスタンスの作成
     *
     * @return void
     */
    public function __construct($channel = null, $message = null, $attachment = null)
    {
        $this->channel = $channel;
        $this->message = $message;
        $this->attachment = $attachment;
    }

    /**
     * 通知の配信チャンネルの取得
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['slack'];
    }
    /**
     * Slack通知表現を返す
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\SlackMessage
     */
    public function toSlack($notifiable)
    {
        $message = (new SlackMessage())
            ->from($this->channel['username'], $this->channel['icon'])
            ->to($this->channel['channel'])
            ->content($this->message);

        if (!(!is_null($this->attachment) && is_array($this->attachment))) {
            return $message;
        }

        $message->attachment(function ($attachment) {
            if (isset($this->attachment['title'])) {
                $attachment->title($this->attachment['title']);
            }
            if (isset($this->attachment['content'])) {
                $attachment->content($this->attachment['content']);
            }
            if (isset($this->attachment['field']) && is_array($this->attachment['field'])) {
                foreach ($this->attachment['field'] as $k => $v) {
                    $attachment->field($k, $v);
                }
            }
        });

        return $message;
    }
}
