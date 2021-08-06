<?php

namespace App\Events;

use App\Enum\BroadCastProperty\BroadCastProperty;
use App\Events\Arg\TestPusherEventArg;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

final class TestPusherEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public TestPusherEventArg $arg;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(TestPusherEventArg $arg)
    {
        $this->arg = $arg;
    }

    /**
     * イベントがブロードキャストするチャンネルを取得
     *
     * @return Channel
     */
    public function broadcastOn(): Channel
    {
        return new Channel(BroadCastProperty::MyChannelName);
    }

    public function broadcastAs()
    {
        return 'my-event';
    }
}
