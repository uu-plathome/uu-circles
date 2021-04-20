<?php

namespace App\Usecases\Main\UuYell;

use App\Usecases\Main\UuYell\Params\FetchUuYellArticlesForCirclesUsecaseParam;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FetchUuYellArticlesForCirclesUsecase
{
    const BASE_UU_YELL_URL = 'https://media.uu-circles.com';

    /**
     * uu-yellからサークルに関する記事を検索し、取得する。
     *
     * @param FetchUuYellArticlesForCirclesUsecaseParam $param
     * @return array
     */
    public function invoke(FetchUuYellArticlesForCirclesUsecaseParam $param): array
    {
        Log::debug("FetchUuYellArticlesForCirclesUsecase args", [
            'param' => $param,
        ]);

        $baseUrl = self::BASE_UU_YELL_URL;

        // HTTP リクエスト
        $fetched = new Collection([]);

        // サークル名による検索
        $response = Http::get("$baseUrl/wp-json/wp/v2/posts?context=embed&search={$param->name}");
        if ($response->status() >= 400) {
            Log::warning("uu-yellの記事が取得できてない可能性があります。", [
                'request_url' => "$baseUrl/wp-json/wp/v2/posts?context=embed&search={$param->name}",
                'param'       => $param,
                'response'    => $response,
            ]);
        }
        $fetched = $fetched->merge($response->status() === 200 ? $response->json() : []);

        // URLによる検索
        $response = Http::get("$baseUrl/wp-json/wp/v2/posts?context=embed&search={$param->circle_url}");
        if ($response->status() >= 400) {
            Log::warning("uu-yellの記事が取得できてない可能性があります。", [
                'request_url' => "$baseUrl/wp-json/wp/v2/posts?context=embed&search={$param->circle_url}",
                'param'       => $param,
                'response'    => $response,
            ]);
        }
        $fetched = $fetched->merge($response->status() === 200 ? $response->json() : []);

        // 重複している記事の削除
        $fetched = $fetched->unique();

        return $fetched->toArray();
    }
}
