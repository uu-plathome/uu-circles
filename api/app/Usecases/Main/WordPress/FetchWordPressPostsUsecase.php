<?php


namespace App\Usecases\Main\WordPress;


use Illuminate\Support\Carbon;
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
            $response = Http::get("$baseUrl/wp-json/wp/v2/posts?per_page=$fetchNumber");

            return [
                'postsNotTags'   => $response->status() === 200 ? $response->json() : [],
                'postsExistTags' => [],
            ];
        }

        // HTTP リクエスト
        $responseNotTags = Http::get("$baseUrl/wp-json/wp/v2/posts?per_page=$fetchNumber&tags_exclude=$tagsTaxonomy");
        $responseExistTags = Http::get("$baseUrl/wp-json/wp/v2/posts?per_page=$fetchNumber&tags=$tagsTaxonomy");

        $postsNotTags = $responseNotTags->status() === 200 ? $responseNotTags->json() : [];
        $postsExistTags = $responseExistTags->status() === 200 ? $responseExistTags->json() : [];

        return [
            'postsNotTags'   => $postsNotTags,
            'postsExistTags' => $postsExistTags,
        ];
    }

    public static function getCacheKey(string $wpUrl, ?string $tagsTaxonomy): string
    {
        $minutes = Carbon::now()->format('YmdH');
        return "FetchWordPressPostsUsecase.$wpUrl.$tagsTaxonomy.$minutes";
    }
}
