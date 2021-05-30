<?php

declare(strict_types=1);

namespace App\Usecases\Batch\UuYell;

use App\Enum\Property\UuyellPostProperty;
use App\Models\UuyellPost;
use App\Repositories\Twitter\InitTwitterRepository;
use App\Support\Arr;
use App\Support\Str;
use Exception;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

final class SendUuyellPostToTwitterUsecase
{
    const UU_YELL_URL = 'https://media.uu-circles.com';

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

        // 23 = Twitterでのリンクの文字数
        $head = "[今日のuu-yell {$now->format('Y.m.d')}]";
        $fetchedDescription = $post->description ? $post->description : $this->fetchedDescription($post->wordpress_id);
        $description = Str::limitCharacters(
            $fetchedDescription,
            140 - 4 - mb_strlen($head) - mb_strlen($post->title) - 23 - 5
        );
        $sendMessage = "{$head}\n\n{$post->title}\n{$description}\n{$post->link}";

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

    /**
     * 今日Tweetするuu-yellの記事を取得する
     *
     * @return UuyellPost|null
     */
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

    protected function fetchedDescription(int $wordpress_id): string
    {
        Log::debug("SendUuyellPostToTwitterUsecase fetchedDescription");

        $baseUrl = self::UU_YELL_URL;
        $requestUrl = "$baseUrl/wp-json/wp/v2/posts/{$wordpress_id}";

        // 記事の取得
        $response = Http::get($requestUrl);
        Log::debug("SendUuyellPostToTwitterUsecase fetchedDescription fetched {$response->status()}");
        if ($response->status() >= 500) {
            Log::info("uu-yellの記事が取得できてない可能性があります。", [
                'request_url' => $requestUrl,
                'response'    => $response,
            ]);
        }

        // 本文取得
        $mainContent = Arr::get($response->json(), 'content.rendered');
        if (!$mainContent) {
            return '';
        }

        // 本文の HTML を除去する。
        $removedHtmlContent = strip_tags($mainContent);
        $requestContent = Str::limitCharacters($removedHtmlContent, 950);

        Log::debug("SendUuyellPostToTwitterUsecase requestContent", [
            'requestContent' => $requestContent,
        ]);

        return Str::limitCharacters($removedHtmlContent, 200);
    }
}
