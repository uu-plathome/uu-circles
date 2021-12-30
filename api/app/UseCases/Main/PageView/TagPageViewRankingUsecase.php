<?php

declare(strict_types=1);

namespace App\UseCases\Main\PageView;

use App\Enum\Property\TagPageViewProperty;
use App\Models\TagPageView;
use App\Support\Arr;
use App\UseCases\Main\PageView\Dto\TagPageViewDto;
use App\UseCases\Main\PageView\Dto\TagPageViewRankingDto;
use Illuminate\Support\Carbon;

final class TagPageViewRankingUsecase
{
    const TTL = 60 * 60 * 24;

    /**
     * タグのアクセスランキング.
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
        $dto->first = $this->convertToTagPageViewDto(Arr::get($tagPageViews, 0));
        $dto->second = $this->convertToTagPageViewDto(Arr::get($tagPageViews, 1));
        $dto->third = $this->convertToTagPageViewDto(Arr::get($tagPageViews, 2));
        $dto->fourth = $this->convertToTagPageViewDto(Arr::get($tagPageViews, 3));
        $dto->fifth = $this->convertToTagPageViewDto(Arr::get($tagPageViews, 4));
        $dto->sixth = $this->convertToTagPageViewDto(Arr::get($tagPageViews, 5));
        $dto->seventh = $this->convertToTagPageViewDto(Arr::get($tagPageViews, 6));
        $dto->eighth = $this->convertToTagPageViewDto(Arr::get($tagPageViews, 7));
        $dto->ninth = $this->convertToTagPageViewDto(Arr::get($tagPageViews, 8));
        $dto->tenth = $this->convertToTagPageViewDto(Arr::get($tagPageViews, 9));

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

        return 'TagPageViewRankingUsecase'.$today;
    }

    private function convertToTagPageViewDto(?TagPageView $tagPageView): ?TagPageViewDto
    {
        if (is_null($tagPageView)) {
            return null;
        }

        $dto = new TagPageViewDto();
        $dto->tagName = $tagPageView->tag_name;
        $dto->pageViews = $tagPageView->page_views;

        return $dto;
    }
}
