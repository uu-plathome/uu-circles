<?php

namespace App\Usecases\Main\UuYell;

use Illuminate\Support\Facades\Http;

class FetchUuYellArticlesUsecase
{
    const BASE_UU_YELL_URL = 'https://media.uu-circles.com';

    const MAX_FETCH_NUMBER = 6;

    /**
     * 最新のUU-yellの記事を6件取得する
     */
    public function invoke()
    {
        $baseUrl = self::BASE_UU_YELL_URL;
        $fetchNumber = self::MAX_FETCH_NUMBER;

        // HTTP リクエスト
        $response = Http::get("$baseUrl/wp-json/wp/v2/posts?per_page=$fetchNumber");

        if ($response->status() === 200) {
            return $response->json();
        }

        return [];
    }
}
