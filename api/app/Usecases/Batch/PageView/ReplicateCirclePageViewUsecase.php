<?php

declare(strict_types=1);

namespace App\Usecases\Batch\PageView;

use App\Enum\Property\CirclePageViewProperty;
use App\Enum\Property\CircleProperty;
use App\Enum\Property\PageViewProperty;
use App\Models\Circle;
use App\Models\CirclePageView;
use App\Models\PageView;
use Exception;
use Illuminate\Support\Facades\DB;

final class ReplicateCirclePageViewUsecase
{
    /**
     * PageViewからCirclePageViewの作成.
     *
     * @throws \Exception
     */
    public function invoke()
    {
        // サークルを取得
        $circles = Circle::whereRelease(true)
            ->get([
                CircleProperty::id,
                CircleProperty::slug,
            ]);

        // サークルからURL生成
        $urls = $circles->map(
            fn (Circle $circle) => $this->generateUrl($circle)
        )->toArray();

        $pageViews = PageView::whereIn(PageViewProperty::url, $urls)
            ->get();

        // Upsert用のデータ作成
        $circlePageViews = $pageViews->map(
            function (PageView $pageView) use ($circles) {
                /** @var Circle $circle */
                $circle = $circles->first(
                    fn ($circle) => $pageView->url === $this->generateUrl($circle)
                );

                if (is_null($circle)) {
                    return null;
                }

                return [
                    CirclePageViewProperty::circle_id    => $circle->id,
                    CirclePageViewProperty::slug         => $circle->slug,
                    CirclePageViewProperty::active_users => $pageView->active_users,
                    CirclePageViewProperty::page_views   => $pageView->page_views,
                ];
            }
        )->filter(fn (?array $arr) => !is_null($arr))
            ->values();

        DB::beginTransaction();

        try {
            CirclePageView::upsert(
                $circlePageViews->toArray(),
                [
                    CirclePageViewProperty::circle_id,
                    CirclePageViewProperty::slug,
                ],
                [
                    CirclePageViewProperty::active_users,
                    CirclePageViewProperty::page_views,
                ]
            );
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }
    }

    private function generateUrl(Circle $circle): string
    {
        return "/circle/$circle->slug";
    }
}
