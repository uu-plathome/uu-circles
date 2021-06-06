<?php

declare(strict_types=1);

namespace App\Usecases\Main\PageView\Dto;

final class TagPageViewDto
{
    public string $tagName;

    public int $pageViews;

    public function toArray(): array
    {
        return [
            'tage_name'  => $this->tagName,
            'page_views' => $this->pageViews,
        ];
    }
}
