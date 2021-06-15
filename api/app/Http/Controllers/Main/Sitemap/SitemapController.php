<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\Sitemap;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Sitemap\Dto\SitemapDto;
use App\Usecases\Main\Sitemap\SitemapUsecase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

final class SitemapController extends Controller
{
    private SitemapUsecase $sitemapUsecase;

    public function __construct(SitemapUsecase $sitemapUsecase)
    {
        $this->sitemapUsecase = $sitemapUsecase;
    }

    /**
     * @return array
     */
    public function __invoke()
    {
        Log::debug('SitemapController args none');

        $sitemaps = Cache::remember(
            $this->getCacheKey(),
            60,
            fn () => $this->sitemapUsecase->invoke()
        );

        return [
            'data' => Arr::camel_keys(
                (new Collection($sitemaps))->map(
                    fn (SitemapDto $sitemap) => $sitemap->toArray()
                )->toArray()
            ),
        ];
    }

    private function getCacheKey(): string
    {
        $minutes = Carbon::now()->format('YmdHi');

        return 'SitemapController'.$minutes;
    }
}
