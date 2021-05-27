<?php

namespace App\Repositories\GoogleAnalytics\Entity;

use Illuminate\Support\Facades\Log;

class PageViewEntity
{
    /**
     * URL
     *
     * @var string
     */
    public string $url;

    /**
     * ユーザー数
     *
     * @var int
     */
    public int $active_users;

    /**
     * ページ閲覧数
     *
     * @var int
     */
    public int $page_views;

    public function toArray(): array
    {
        Log::debug("PageViewEntity toArray args none");
        
        return [
            'url'          => $this->url,
            'active_users' => $this->active_users,
            'page_views'   => $this->page_views,
        ];
    }
}
