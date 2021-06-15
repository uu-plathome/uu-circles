<?php

namespace App\Repositories\GoogleAnalytics;

use App\Repositories\GoogleAnalytics\Entity\MultiplePageViewEntity;
use App\Repositories\GoogleAnalytics\Entity\PageViewEntity;
use Google\Analytics\Data\V1beta\DateRange;
use Google\Analytics\Data\V1beta\Dimension;
use Google\Analytics\Data\V1beta\Metric;
use Illuminate\Support\Facades\Log;

class UuCirclesPageViewsRepository
{
    private InitGoogleAnalyticsRepository $repository;

    public function __construct(InitGoogleAnalyticsRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * URLに対するページ数とユーザー数を取得する.
     *
     * @throws \Google\ApiCore\ApiException
     *
     * @return MultiplePageViewEntity
     */
    public function invoke(): MultiplePageViewEntity
    {
        Log::debug('UuCirclesPageViewsRepository args none');

        $client = $this->repository->init();

        // UU-CirclesのプロパティID
        $property_id = GoogleAnalyticsRepositoryProperty::UU_CIRCLES_PROPERTY_ID;

        // Make an API call.
        $response = $client->runReport([
            'property'   => 'properties/'.$property_id,
            'dateRanges' => [
                new DateRange([
                    'start_date' => '2020-03-31',
                    'end_date'   => 'today',
                ]),
            ],
            'dimensions' => [
                new Dimension(
                    [
                        'name' => 'pagePath',
                    ]
                ),
            ],
            'metrics' => [
                new Metric(
                    [
                        'name' => 'newUsers',
                    ]
                ),
                new Metric(
                    [
                        'name' => 'screenPageViews',
                    ]
                ),
            ],
        ]);

        // Entityの生成
        $entity = new MultiplePageViewEntity();
        $entity->pageViewEntities = [];

        foreach ($response->getRows() as $row) {
            $pageViewEntity = new PageViewEntity();
            $pageViewEntity->url = $row->getDimensionValues()[0]->getValue();
            $pageViewEntity->active_users = $row->getMetricValues()[0]->getValue();
            $pageViewEntity->page_views = $row->getMetricValues()[1]->getValue();

            $entity->pageViewEntities[] = $pageViewEntity;
        }

        return $entity;
    }
}
