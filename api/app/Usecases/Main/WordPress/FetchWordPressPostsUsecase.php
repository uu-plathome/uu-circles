<?php


namespace App\Usecases\Main\WordPress;


use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FetchWordPressPostsUsecase
{
    const MAX_FETCH_NUMBER = 4;

    /**
     * 最新のWordPressの記事を6件取得する
     */
    public function invoke(string $wpUrl, ?string $tagsTaxonomy): array
    {
        Log::debug("FetchUuYellArticlesUsecase args none");

        $baseUrl = $wpUrl;
        $fetchNumber = self::MAX_FETCH_NUMBER;

        if (!$tagsTaxonomy) {
            // HTTP リクエスト
            $response = Http::get("$baseUrl/wp-json/wp/v2/posts?context=embed&per_page=$fetchNumber");

            return [
                'postsNotTags'   => $response->status() === 200 ? $response->json() : [],
                'postsExistTags' => [],
            ];
        }

        // POST取得 HTTP リクエスト
        $responseNotTags = Http::get(
            "$baseUrl/wp-json/wp/v2/posts?context=embed&per_page=$fetchNumber&tags_exclude=$tagsTaxonomy"
        );
        $responseExistTags = Http::get(
            "$baseUrl/wp-json/wp/v2/posts?context=embed&per_page=$fetchNumber&tags=$tagsTaxonomy"
        );

        $postsNotTags = $responseNotTags->status() === 200 ? $responseNotTags->json() : [];
        $postsExistTags = $responseExistTags->status() === 200 ? $responseExistTags->json() : [];

        $postItems = new Collection(array_merge(
            $postsExistTags,
            $postsNotTags
        ));
        $mediaIds = $postItems->map(
            fn (array $arr) => $arr["featured_media"]
        )
            ->unique()
            ->toArray();
        $mediaIdsStr = implode(",", $mediaIds);
        // MEDIA取得 HTTP リクエスト
        $responseMedias = Http::get(
            "$baseUrl/wp-json/wp/v2/media?context=embed&include=$mediaIdsStr"
        );

        $medias = $responseMedias->status() === 200 ? $responseMedias->json() : [];

        return [
            'postsNotTags'   => $postsNotTags,
            'postsExistTags' => $postsExistTags,
            'medias'         => $medias,
        ];
    }

    public static function getCacheKey(string $wpUrl, ?string $tagsTaxonomy): string
    {
        $minutes = Carbon::now()->format('YmdH');
        return "FetchWordPressPostsUsecase.$wpUrl.$tagsTaxonomy.$minutes";
    }
}
