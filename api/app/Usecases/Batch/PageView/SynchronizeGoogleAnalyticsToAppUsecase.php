<?php

declare(strict_types=1);

namespace App\Usecases\Batch\PageView;

use App\Enum\Property\PageViewProperty;
use App\Models\PageView;
use App\Repositories\GoogleAnalytics\Entity\PageViewEntity;
use App\Repositories\GoogleAnalytics\UuCirclesPageViewsRepository;
use Exception;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class SynchronizeGoogleAnalyticsToAppUsecase
{
    private UuCirclesPageViewsRepository $uuCirclesPageViewsRepository;

    public function __construct(UuCirclesPageViewsRepository $uuCirclesPageViewsRepository)
    {
        $this->uuCirclesPageViewsRepository = $uuCirclesPageViewsRepository;
    }

    /**
     * Application の DB (PageView) に Google Analytics のデータを入れる.
     *
     * @throws \Google\ApiCore\ApiException
     * @throws \Exception
     */
    public function invoke()
    {
        Log::debug('SynchronizeGoogleAnalyticsToAppUsecase args none');

        $entity = $this->uuCirclesPageViewsRepository->invoke();
        $now = new Carbon();

        DB::beginTransaction();

        try {
            // 既存のデータを全て削除
            PageView::query()->delete();

            // インサート用のデータ作成
            $pageViewInsertData = (new Collection($entity->pageViewEntities))->map(
                fn (PageViewEntity $pageViewEntity) => [
                    PageViewProperty::url          => $pageViewEntity->url,
                    PageViewProperty::active_users => $pageViewEntity->active_users,
                    PageViewProperty::page_views   => $pageViewEntity->page_views,
                    PageViewProperty::created_at   => $now,
                    PageViewProperty::updated_at   => $now,
                ]
            )->toArray();
            // インサート
            PageView::insert($pageViewInsertData);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }
    }
}
