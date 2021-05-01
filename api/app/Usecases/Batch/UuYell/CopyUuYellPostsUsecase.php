<?php

namespace App\Usecases\Batch\UuYell;

use App\Enum\Property\UuyellPostProperty;
use App\Models\UuyellPost;
use App\Support\Arr;
use App\Support\Str;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CopyUuYellPostsUsecase
{
    const UU_YELL_URL = 'https://media.uu-circles.com';

    const FETCH_NUMBER = 100;

    const DONE_TAG = 59;

    /**
     * @throws \Exception
     */
    public function invoke()
    {
        Log::debug("CopyUuYellPostsUsecase args none");

        // 投稿の取得
        $fetchedPosts = $this->fetchUuYellPosts();
        // 画像の取得
        $featuredMedias = $fetchedPosts->map(
            fn (array $arr) => $arr["featured_media"]
        )->unique()
            ->toArray();
        // 画像の取得
        $fetchedMedias = $this->fetchUuYellMedias($featuredMedias);

        $formatForUuyellPosts = $fetchedPosts->map(
            function (array $arr) use ($fetchedMedias) {
                $media = $fetchedMedias->first(
                    fn (array $media) => !is_null(Arr::get($arr, 'featured_media')) &&
                        Arr::get($media, 'id') === Arr::get($arr, 'featured_media')
                );

                return [
                    UuyellPostProperty::wordpress_id     => Arr::get($arr, 'id'),
                    UuyellPostProperty::title            => Arr::get($arr, 'title.rendered'),
                    UuyellPostProperty::description      => Str::limitCharacters(
                        implode(
                            '\n',
                            Arr::get($arr, 'custom_fields.sng_meta_description', [])
                        ),
                        255
                    ),
                    UuyellPostProperty::slug             => Arr::get($arr, 'slug'),
                    UuyellPostProperty::link             => Arr::get($arr, 'link'),
                    UuyellPostProperty::date             => Arr::get($arr, 'date'),
                    UuyellPostProperty::featured_media   => Arr::get($arr, 'featured_media'),
                    UuyellPostProperty::published        => true,
                    UuyellPostProperty::can_repost       =>
                        in_array(self::DONE_TAG, Arr::get($arr, 'tags', [])) === false,
                    UuyellPostProperty::media_source_url => Arr::get($media, 'source_url'),
                    UuyellPostProperty::media_alt_text   => Arr::get($media, 'alt_text'),
                ];
            }
        );

        $wordpressIds = $fetchedPosts->map(
            fn (array $arr) => Arr::get($arr, 'id')
        )->toArray();

        DB::beginTransaction();
        try {
            UuyellPost::upsert(
                $formatForUuyellPosts->toArray(),
                [ UuyellPostProperty::wordpress_id ],
                [
                    UuyellPostProperty::wordpress_id,
                    UuyellPostProperty::title,
                    UuyellPostProperty::description,
                    UuyellPostProperty::slug,
                    UuyellPostProperty::link,
                    UuyellPostProperty::date,
                    UuyellPostProperty::featured_media,
                    UuyellPostProperty::published,
                    UuyellPostProperty::media_source_url,
                    UuyellPostProperty::media_alt_text,
                ]
            );

            UuyellPost::whereNotIn(UuyellPostProperty::wordpress_id, $wordpressIds)
                ->update([
                    UuyellPostProperty::published => false,
                ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            throw $e;
        }
    }

    /**
     * uu-yellの記事を取得する
     *
     * @return Collection
     */
    protected function fetchUuYellPosts(): Collection
    {
        $baseUrl = self::UU_YELL_URL;
        $fetchNumber = self::FETCH_NUMBER;
        $requestUrl = "$baseUrl/wp-json/wp/v2/posts?per_page=$fetchNumber";

        // 記事の取得
        $response = Http::get($requestUrl);
        Log::debug("FetchUuYellArticlesForCirclesUsecase status {$response->status()}");
        if ($response->status() >= 500) {
            Log::info("uu-yellの記事が取得できてない可能性があります。", [
                'request_url' => $requestUrl,
                'response'    => $response,
            ]);
        }

        return $response->status() === 200 ? new Collection($response->json()) : new Collection([]);
    }

    protected function fetchUuYellMedias(array $featuredMedias): Collection
    {
        $baseUrl = self::UU_YELL_URL;
        $fetchNumber = self::FETCH_NUMBER;
        $mediaIdsStr = implode(",", $featuredMedias);

        // MEDIA取得 HTTP リクエスト
        $response = Http::get(
            "$baseUrl/wp-json/wp/v2/media?context=embed&include=$mediaIdsStr&per_page=$fetchNumber"
        );

        return $response->status() === 200 ? new Collection($response->json()) : new Collection([]);
    }
}
