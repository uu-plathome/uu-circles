<?php

declare(strict_types=1);

namespace App\Usecases\Main\PageView;

use App\Enum\Property\TagPageViewProperty;
use App\Models\TagPageView;
use App\Usecases\Main\PageView\Dto\TagPageViewDto;
use App\Usecases\Main\PageView\Dto\TagPageViewRankingDto;
use Illuminate\Support\Carbon;

final class TagPageViewRankingUsecase
{
    const TTL = 60 * 60 * 24;

    /**
     * タグのアクセスランキング
     *
     * @return TagPageViewRankingDto
     */
    public function invoke(): TagPageViewRankingDto
    {
        $tagPageViews = TagPageView::select([
            TagPageViewProperty::tag_name,
            TagPageViewProperty::page_views,
        ])->orderByDesc(TagPageViewProperty::page_views)
            ->take(10)
            ->get();

        $dto = new TagPageViewRankingDto();
        $dto->first = $this->convertToTagPageViewDto($tagPageViews[0]);
        $dto->second = $this->convertToTagPageViewDto($tagPageViews[1]);
        $dto->third = $this->convertToTagPageViewDto($tagPageViews[2]);
        $dto->fourth = $this->convertToTagPageViewDto($tagPageViews[3]);
        $dto->fifth = $this->convertToTagPageViewDto($tagPageViews[4]);
        $dto->sixth = $this->convertToTagPageViewDto($tagPageViews[5]);
        $dto->seventh = $this->convertToTagPageViewDto($tagPageViews[6]);
        $dto->eighth = $this->convertToTagPageViewDto($tagPageViews[7]);
        $dto->ninth = $this->convertToTagPageViewDto($tagPageViews[8]);
        $dto->tenth = $this->convertToTagPageViewDto($tagPageViews[9]);
        return $dto;
    }

    /**
     * キャッシュ用のキー
     *
     * @return string
     */
    public static function getCacheKey(): string
    {
        $today = Carbon::today();
        return 'TagPageViewRankingUsecase' . $today;
    }

    private function convertToTagPageViewDto(TagPageView $tagPageView): TagPageViewDto
    {
        $dto = new TagPageViewDto();
        $dto->tagName = $tagPageView->tag_name;
        $dto->pageViews = $tagPageView->page_views;
        return $dto;
    }
}
