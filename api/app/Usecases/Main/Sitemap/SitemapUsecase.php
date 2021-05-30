<?php

declare(strict_types=1);

namespace App\Usecases\Main\Sitemap;

use App\Enum\SlugProperty\CategorySlugProperty;
use App\Enum\SlugProperty\TagSlugProperty;
use App\Models\Circle;
use App\Models\CircleNewJoy;
use App\Usecases\Main\Sitemap\Dto\SitemapDto;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

final class SitemapUsecase
{
    /**
     * サイトトップの作成
     */
    public function invoke(): array
    {
        Log::debug('SitemapUsecase args none');

        return array_merge(
            $this->computedStaticSitemap(),
            $this->computedCircleSitemap(),
            $this->computedCircleNewJoySitemap(),
            $this->computedTagSitemap(),
            $this->computedCategorySitemap()
        );
    }

    /**
     * @return SitemapDto[]
     */
    private function computedStaticSitemap(): array
    {
        $url = config('app.client_url');

        return [
            SitemapDto::of(
                $url,
                '2021-03-07',
            ),
            SitemapDto::of(
                $url . '/terms',
                '2021-03-07',
            ),
            SitemapDto::of(
                $url . '/privacy',
                '2021-03-07',
            ),
            SitemapDto::of(
                $url . '/circle',
                '2021-03-07',
            ),
            SitemapDto::of(
                $url . '/circle/newjoy',
                '2021-03-07',
            ),
            SitemapDto::of(
                $url . '/guide/discord',
                '2021-03-07',
            ),
            SitemapDto::of(
                $url . '/guide/management-team',
                '2021-03-07',
            ),
            SitemapDto::of(
                $url . '/guide/to-new-students',
                '2021-03-07',
            ),
        ];
    }

    /**
     * @return SitemapDto[]
     */
    public function computedCircleSitemap(): array
    {
        $circles = $this->fetchCircle();
        $url = config('app.client_url');

        return [
            ...$circles->map(
                fn ($circle) =>
                SitemapDto::of(
                    $url . "/circle/$circle->slug",
                    $circle->created_at->format('Y-m-d')
                ),
            )->toArray(),
            ...$circles->map(
                fn ($circle) =>
                SitemapDto::of(
                    $url . "/circle/$circle->slug/newjoy",
                    $circle->created_at->format('Y-m-d')
                ),
            )->toArray(),
        ];
    }

    /**
     * @return SitemapDto[]
     */
    public function computedCircleNewJoySitemap(): array
    {
        $circleNewJoys = $this->fetchCircleNewJoys();
        $url = config('app.client_url');

        return $circleNewJoys->map(
            fn ($circleNewJoy) =>
            SitemapDto::of(
                $url . "/circle/{$circleNewJoy->circle->slug}/newjoy/{$circleNewJoy->id}",
                $circleNewJoy->created_at->format('Y-m-d')
            )
        )->toArray();
    }

    /**
     * @return SitemapDto[]
     */
    public function computedTagSitemap(): array
    {
        $url = config('app.client_url');
        $tags = TagSlugProperty::getAll();

        return (new Collection($tags))->map(
            fn ($tag) =>
            SitemapDto::of(
                $url . "/circle/tag/$tag",
                '2021-03-07',
            ),
        )->toArray();
    }

    /**
     * @return SitemapDto[]
     */
    public function computedCategorySitemap(): array
    {
        $url = config('app.client_url');
        $categories = [
            CategorySlugProperty::official_organization,
            CategorySlugProperty::unofficial_organization,
            CategorySlugProperty::club,
            CategorySlugProperty::student_group,
        ];

        return (new Collection($categories))->map(
            fn ($category) =>
            SitemapDto::of(
                $url . "/circle/category/$category",
                '2021-03-07',
            )
        )->toArray();
    }

    public function fetchCircle()
    {
        return Circle::whereRelease(true)
            ->hasByNonDependentSubquery('circleInformation')
            ->hasByNonDependentSubquery('circleHandbill')
            ->get();
    }

    public function fetchCircleNewJoys()
    {
        return $circleNewJoys = CircleNewJoy::with('circle')
            ->nowPublic(Carbon::now())
            ->hasByNonDependentSubquery('circle', function ($query) {
                $query->whereRelease(true);
            })
            ->get();
    }
}
