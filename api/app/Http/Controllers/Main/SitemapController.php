<?php

namespace App\Http\Controllers\Main;

use App\Dto\SitemapDto;
use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Sitemap\SitemapUsecase;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class SitemapController extends Controller
{
    private SitemapUsecase $sitemapUsecase;

    public function __construct(SitemapUsecase $sitemapUsecase)
    {
        $this->sitemapUsecase = $sitemapUsecase;
    }

    public function __invoke()
    {
        Log::debug('SitemapController args none');

        $sitemaps = $this->sitemapUsecase->invoke();
        Log::debug('', [$sitemaps]);

        return [
            'data' => Arr::camel_keys(
                (new Collection($sitemaps))->map(
                    fn (SitemapDto $sitemap) => $sitemap->toArray()
                )->toArray()
            )
        ];
    }
}
