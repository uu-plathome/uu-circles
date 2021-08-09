<?php

namespace App\Events;

use App\Enum\BroadCastProperty\BroadCastProperty;
use App\Events\Arg\PagePositions;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

final class SendPagePosition implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public PagePositions $arg;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(PagePositions $arg)
    {
        Log::debug("SendPagePosition constructor args", [
            'arg' => $arg,
        ]);
        $this->arg = $arg;
    }

    /**
     * イベントがブロードキャストするチャンネルを取得
     *
     * @return Channel
     */
    public function broadcastOn(): Channel
    {
        return new Channel(BroadCastProperty::PagePositionChannel);
    }

    public function broadcastAs()
    {
        return 'my-event';
    }
}
