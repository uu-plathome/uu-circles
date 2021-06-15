<?php

namespace App\Repositories\Twitter;

use Abraham\TwitterOAuth\TwitterOAuth;
use Illuminate\Support\Facades\Log;

class InitTwitterRepository
{
    /**
     * Twitter Client.
     *
     * @return TwitterOAuth
     */
    public function init(): TwitterOAuth
    {
        Log::debug('InitTwitterRepository init args none');

        $consumer_key = config('twitter.consumer_key');
        $consumer_key_secret = config('twitter.consumer_secret_key');
        $access_token = config('twitter.access_token');
        $access_token_secret = config('twitter.access_secret_token');

        return new TwitterOAuth(
            $consumer_key,
            $consumer_key_secret,
            $access_token,
            $access_token_secret
        );
    }

    public function tweet(TwitterOAuth $twitterOAuth, string $sendMessage)
    {
        Log::debug('InitTwitterRepository tweet args', [
            'sendMessage' => $sendMessage,
        ]);

        $post = $twitterOAuth->post(
            'statuses/update',
            ['status' => $sendMessage]
        );

        Log::debug('InitTwitterRepository', [
            'post' => $post,
        ]);

        return $post;
    }
}
