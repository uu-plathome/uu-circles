<?php

namespace App\Usecases\Batch\UuYell;

use App\Enum\Property\UuyellPostProperty;
use App\Models\UuyellPost;
use App\Repositories\Twitter\InitTwitterRepository;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SendUuyellPostToTwitterUsecase
{
    private InitTwitterRepository $initTwitterRepository;

    public function __construct(InitTwitterRepository $initTwitterRepository)
    {
        $this->initTwitterRepository = $initTwitterRepository;
    }

    /**
     * @throws \Exception
     */
    public function invoke()
    {
        Log::debug("SendUuyellPostToTwitterUsecase args none");

        $now = Carbon::now();

        $post = $this->getNotificationTargetPost();

        if (is_null($post)) {
            Log::debug("SendUuyellPostToTwitterUsecase 通知対象がありませんでした");
            return;
        }

        $twitterClient = $this->initTwitterRepository->init();
        $sendMessage = "[今日のuu-yell {$now->format('Y.m.d')}]\n\n{$post->title}\n{$post->link}";

        $tweetContent = $this->initTwitterRepository->tweet(
            $twitterClient,
            $sendMessage
        );

        Log::debug("SendUuyellPostToTwitterUsecase getLastHttpCode={$twitterClient->getLastHttpCode()}", [
            'original'    => $tweetContent,
            'originalArr' => (array)$tweetContent,
        ]);
        if ($twitterClient->getLastHttpCode() >= 400) {
            Log::error(
                "SendUuyellPostToTwitterUsecase Tweetできなかった可能性があります。",
                [
                    'original'    => $tweetContent,
                    'originalArr' => (array)$tweetContent,
                ]
            );

            return;
        }

        $tweetContentArr = (array)$tweetContent;

        DB::beginTransaction();
        try {
            $post->update([
                UuyellPostProperty::tweet_id    => $tweetContentArr['id'],
                UuyellPostProperty::notified_at => $now,
            ]);

            DB::commit();

            return;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error("SendUuyellPostToTwitterUsecase [ERROR]", [
                'now'      => $now,
                'tweetId'  => $tweetContentArr['id'],
                'original' => $tweetContent
            ]);
            throw $e;
        }
    }

    protected function getNotificationTargetPost(): ?UuyellPost
    {
        Log::debug("SendUuyellPostToTwitterUsecase getNotificationTargetPost");

        $post = UuyellPost::wherePublished(true)
            ->whereNotifiedAt(null)
            ->whereCanRepost(true)
            ->orderByDesc(UuyellPostProperty::wordpress_id)
            ->first();

        if (!is_null($post)) {
            return $post;
        }

        return UuyellPost::wherePublished(true)
            ->whereCanRepost(true)
            ->inRandomOrder()
            ->first();
    }
}
