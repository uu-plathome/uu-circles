<?php

declare(strict_types=1);

namespace App\Usecases\Batch\UuYell;

use App\Enum\Property\UuyellPostProperty;
use App\Models\UuyellPost;
use App\Support\Arr;
use App\Support\Str;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

final class CopyUuYellPostsUsecase
{
    const UU_YELL_URL = 'https://media.uu-circles.com';

    const FETCH_NUMBER = 100;

    const DONE_TAG = 59;

    /**
     * 現在取得するページ数.
     *
     * @var int
     */
    protected int $nowPage = 1;

    /**
     * 最大ページ数.
     *
     * @var int
     */
    protected int $maxPage = 50;

    /**
     * 次のページを取得するかどうか.
     *
     * @var bool
     */
    protected bool $isNextFetch = false;

    /**
     * 今回取得した WordPress Id 一覧.
     *
     * @var int[]
     */
    protected array $wordpressIds = [];

    /**
     * @throws Exception
     */
    public function invoke()
    {
        Log::debug('CopyUuYellPostsUsecase args none');

        // 無限ループだと処理失敗時に大変なことになりそうなので、50回(50000記事分)までしかループしないようにしている
        for ($i = 0; $i < 50; $i++) {
            $this->isNextFetch = false;
            $this->handler($this->nowPage);

            // 次のページを取得する必要があるか確認しなければ、処理終了
            if (!$this->isNextFetch) {
                // 非公開となっているWordPressの記事を、非公開にする
                UuyellPost::whereNotIn(UuyellPostProperty::wordpress_id, $this->wordpressIds)
                    ->update([
                        UuyellPostProperty::published => false,
                    ]);

                break;
            }
        }
    }

    /**
     * @param int $page 現在取得したいページ数
     *
     * @throws Exception
     */
    protected function handler(int $page)
    {
        Log::debug('CopyUuYellPostsUsecase handler args', [
            'page' => $page,
        ]);

        // 投稿の取得
        $fetchedPosts = $this->fetchUuYellPosts($page);

        // 投稿が取得できないときは処理終了
        if ($fetchedPosts->isEmpty()) {
            return;
        }

        // ページに100件にデータがあったら、次のページも見る
        if ($fetchedPosts->count() === self::FETCH_NUMBER) {
            $this->isNextFetch = $this->nowPage < $this->maxPage;
            $this->nowPage = $this->nowPage + 1;
        }

        // 画像の取得
        $featuredMedias = $fetchedPosts->map(
            fn (array $arr) => Arr::get($arr, 'featured_media')
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
                    UuyellPostProperty::can_repost       => in_array(self::DONE_TAG, Arr::get($arr, 'tags', [])) === false,
                    UuyellPostProperty::media_source_url => Arr::get($media, 'source_url'),
                    UuyellPostProperty::media_alt_text   => Arr::get($media, 'alt_text'),
                ];
            }
        );

        // WordPressのid一覧作成
        $wordpressIds = $fetchedPosts->map(
            fn (array $arr) => Arr::get($arr, 'id')
        )->toArray();
        $this->wordpressIds = array_merge($this->wordpressIds, $wordpressIds);

        DB::beginTransaction();

        try {
            UuyellPost::upsert(
                $formatForUuyellPosts->toArray(),
                [UuyellPostProperty::wordpress_id],
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

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            throw $e;
        }
    }

    /**
     * uu-yellの記事を取得する.
     *
     * @param int $page
     *
     * @return Collection
     */
    protected function fetchUuYellPosts(int $page = 1): Collection
    {
        $baseUrl = self::UU_YELL_URL;
        $fetchNumber = self::FETCH_NUMBER;
        $requestUrl = "$baseUrl/wp-json/wp/v2/posts?per_page=$fetchNumber&page=$page";

        Log::debug('CopyUuYellPostsUsecase fetchUuYellPosts args', [
            'page'        => $page,
            'baseUrl'     => $baseUrl,
            'fetchNumber' => $fetchNumber,
            'requestUrl'  => $requestUrl,
        ]);

        // 記事の取得
        $response = Http::retry(3, 100)->get($requestUrl);
        Log::debug("FetchUuYellArticlesForCirclesUsecase status {$response->status()}");
        if ($response->serverError()) {
            Log::info('uu-yellの記事が取得できてない可能性があります。', [
                'request_url' => $requestUrl,
                'response'    => $response,
            ]);
        }

        $this->maxPage = intval($response->header('x-wp-totalpages'));
        Log::debug("FetchUuYellArticlesForCirclesUsecase maxPage {$this->maxPage}");

        return $response->successful() ? new Collection($response->json()) : new Collection([]);
    }

    /**
     * 画像の取得.
     *
     * @param array $featuredMedias
     *
     * @throws Exception
     *
     * @return Collection
     */
    protected function fetchUuYellMedias(array $featuredMedias): Collection
    {
        $baseUrl = self::UU_YELL_URL;
        $fetchNumber = self::FETCH_NUMBER;
        $mediaIdsStr = implode(',', $featuredMedias);

        // MEDIA取得 HTTP リクエスト
        $response = Http::retry(3, 100)->get(
            "$baseUrl/wp-json/wp/v2/media?context=embed&include=$mediaIdsStr&per_page=$fetchNumber"
        );

        if (!$response->successful()) {
            throw new Exception('uu-yellのメディアデータの取得ができませんでした。');
        }

        return new Collection($response->json());
    }
}
