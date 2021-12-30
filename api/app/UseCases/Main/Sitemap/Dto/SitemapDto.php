<?php

declare(strict_types=1);

namespace App\UseCases\Main\Sitemap\Dto;

final class SitemapDto
{
    public string $site_url;
    public string $publish_at;

    public function __construct(
        string $site_url,
        string $publish_at
    ) {
        $this->site_url = $site_url;
        $this->publish_at = $publish_at;
    }

    public static function of(
        string $site_url,
        string $publish_at
    ): self {
        return new self($site_url, $publish_at);
    }

    public function toArray(): array
    {
        return [
            'site_url'    => $this->site_url,
            'publish_at'  => $this->publish_at,
        ];
    }
}
