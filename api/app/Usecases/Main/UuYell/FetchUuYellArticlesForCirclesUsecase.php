<?php

declare(strict_types=1);

namespace App\Usecases\Main\UuYell;

use App\Usecases\Main\UuYell\Params\FetchUuYellArticlesForCirclesUsecaseParam;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

final class FetchUuYellArticlesForCirclesUsecase
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
        Log::debug("FetchUuYellArticlesForCirclesUsecase status {$response->status()}");
        if ($response->status() >= 500) {
            Log::info("uu-yellの記事が取得できてない可能性があります。", [
                'request_url' => "$baseUrl/wp-json/wp/v2/posts?context=embed&search={$param->name}",
                'param'       => $param,
                'response'    => $response,
            ]);
        }
        $fetched = $fetched->merge($response->status() === 200 ? $response->json() : []);

        // URLによる検索
        $response = Http::get("$baseUrl/wp-json/wp/v2/posts?context=embed&search={$param->circle_url}");
        Log::debug("FetchUuYellArticlesForCirclesUsecase status {$response->status()}");
        if ($response->status() >= 500) {
            Log::info("uu-yellの記事が取得できてない可能性があります。", [
                'request_url' => "$baseUrl/wp-json/wp/v2/posts?context=embed&search={$param->circle_url}",
                'param'       => $param,
                'response'    => $response,
            ]);
        }
        $fetched = $fetched->merge($response->status() === 200 ? $response->json() : []);

        // 重複している記事の削除
        $fetched = $fetched->unique();

        // 画像の取得
        $mediaIds = $fetched->map(
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
            'posts'  => $fetched->toArray(),
            'medias' => $medias,
        ];
    }
}
