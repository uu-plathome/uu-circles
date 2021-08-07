<?php

namespace App\Events\Arg;

use App\Models\PagePositionHistory;

final class PagePositionItemArg
{
    public string $pageUrl;
    
    public string $pagePositionId;
    
    public string $createdAt;
    
    public static function byEloquent(
        PagePositionHistory $pagePositionHistory
    ): self {
        $item = new self();

        $item->pageUrl = $pagePositionHistory->page_url;
        $item->pagePositionId = $pagePositionHistory->page_position_id;
        $item->createdAt = $pagePositionHistory->created_at->format('Y-m-d H:i:s');

        return $item;
    }
}
