<?php

declare(strict_types=1);

namespace App\Usecases\Batch\PageView;

use App\Enum\Property\PageViewProperty;
use App\Enum\Property\TagPageViewProperty;
use App\Enum\SlugProperty\TagSlugProperty;
use App\Models\PageView;
use App\Models\TagPageView;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

final class ReplicateTagPageViewUsecase
{
    /**
     * PageViewからTagPageViewの作成.
     *
     * @throws \Exception
     */
    public function invoke()
    {
        // 集計するタグ一覧
        $tagList = $this->tagSlugListToBeAggregated();

        // サークルからURL生成
        $urls = $tagList->map(
            fn (string $tag) => $this->generateUrl($tag)
        )->toArray();

        $pageViews = PageView::whereIn(PageViewProperty::url, $urls)
            ->get();

        // Upsert用のデータ作成
        $circlePageViews = $pageViews->map(
            function (PageView $pageView) use ($tagList) {
                $tag = $tagList->first(
                    fn (string $_tag) => $pageView->url === $this->generateUrl($_tag)
                );

                if (is_null($tag)) {
                    return null;
                }

                return [
                    TagPageViewProperty::tag_name     => $tag,
                    TagPageViewProperty::active_users => $pageView->active_users,
                    TagPageViewProperty::page_views   => $pageView->page_views,
                ];
            }
        )->filter(fn (?array $arr) => !is_null($arr))
            ->values();

        DB::beginTransaction();

        try {
            TagPageView::upsert(
                $circlePageViews->toArray(),
                [
                    TagPageViewProperty::tag_name,
                ],
                [
                    TagPageViewProperty::active_users,
                    TagPageViewProperty::page_views,
                ]
            );
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }
    }

    /**
     * アクセス数を集計するタグ一覧.
     *
     * @return Collection
     */
    private function tagSlugListToBeAggregated(): Collection
    {
        return new Collection([
            TagSlugProperty::sport,
            TagSlugProperty::music,
            TagSlugProperty::culture,
            TagSlugProperty::nature,
            TagSlugProperty::community,
            TagSlugProperty::international,
            TagSlugProperty::incare,
            TagSlugProperty::programming,
            TagSlugProperty::volunteer,
            TagSlugProperty::active_activity,
            TagSlugProperty::loose,
            TagSlugProperty::monday,
            TagSlugProperty::tuesday,
            TagSlugProperty::wednesday,
            TagSlugProperty::thursday,
            TagSlugProperty::friday,
            TagSlugProperty::only_monday,
            TagSlugProperty::only_tuesday,
            TagSlugProperty::only_wednesday,
            TagSlugProperty::only_thursday,
            TagSlugProperty::only_friday,
            TagSlugProperty::holiday,
            TagSlugProperty::mammoth,
            TagSlugProperty::urgent_recruitment,
            TagSlugProperty::mystery,
            TagSlugProperty::online,
            TagSlugProperty::mine,
            TagSlugProperty::yoto,
        ]);
    }

    private function generateUrl(string $tag): string
    {
        return "/circle/tag/$tag";
    }
}
