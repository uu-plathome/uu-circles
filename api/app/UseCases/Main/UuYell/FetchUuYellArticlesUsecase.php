<?php

declare(strict_types=1);

namespace App\Usecases\Main\UuYell;

use App\Enum\Property\UuyellPostProperty;
use App\Models\UuyellPost;
use Illuminate\Support\Facades\Log;

final class FetchUuYellArticlesUsecase
{
    /**
     * 取得する投稿数.
     */
    const MAX_FETCH_NUMBER = 6;

    /**
     * 最新のUU-yellの記事を6件取得する.
     */
    public function invoke()
    {
        Log::debug('FetchUuYellArticlesUsecase args none');

        $fetchNumber = self::MAX_FETCH_NUMBER;

        $uuYellPosts = UuyellPost::wherePublished(true)
            ->select([
                UuyellPostProperty::wordpress_id,
                UuyellPostProperty::link,
                UuyellPostProperty::date,
                UuyellPostProperty::title,
                UuyellPostProperty::featured_media,
                UuyellPostProperty::slug,
            ])
            ->take($fetchNumber)
            ->orderByDesc(UuyellPostProperty::date)
            ->get();

        return $uuYellPosts->map(
            fn (UuyellPost $post) => [
                'id'             => $post->wordpress_id,
                'date'           => $post->date,
                'slug'           => $post->slug,
                'link'           => $post->link,
                'featured_media' => $post->featured_media,
                'title'          => [
                    'rendered' => $post->title,
                ],
                'type'  => 'post',
            ]
        );
    }
}
