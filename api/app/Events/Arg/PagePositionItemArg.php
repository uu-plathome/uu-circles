<?php

namespace App\Events\Arg;

use App\Models\PagePositionHistory;

final class PagePositionItemArg
{
    /**
     * @var int id
     */
    public int $pagePositionHistoryId;
    /**
     * @var string ページURL
     */
    public string $pageUrl;

    /**
     * @var string ページ名
     */
    public string $pageName;

    /**
     * @var string ページ内での位置 (id)
     */
    public string $pagePositionId;

    /**
     * @var string 登録日
     */
    public string $createdAt;

    public static function byEloquent(
        PagePositionHistory $pagePositionHistory
    ): self {
        $item = new self();

        $item->pagePositionHistoryId = $pagePositionHistory->id;
        $item->pageUrl = $pagePositionHistory->page_url;
        $item->pageName = $pagePositionHistory->page_name;
        $item->pagePositionId = $pagePositionHistory->page_position_id;
        $item->createdAt = $pagePositionHistory->created_at->format('Y-m-d H:i:s');

        return $item;
    }
}
