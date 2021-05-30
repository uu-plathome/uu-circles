<?php

declare(strict_types=1);

namespace App\Usecases\Main\Statistics\Dto;

use App\Enum\Property\CirclePageViewProperty;
use App\Models\CirclePageView;
use App\ValueObjects\CircleValueObject;

/**
 * サークルページ閲覧数ランキング
 */
final class StatisticsCirclePageViewsHighRankingDto
{
    /**
     * 1位
     *
     * @var CircleValueObject|null
     */
    public ?CircleValueObject $first;

    /**
     * 1位
     *
     * @var CirclePageView|null
     */
    public ?CirclePageView $first_page_view;

    /**
     * 2位
     *
     * @var CircleValueObject|null
     */
    public ?CircleValueObject $second;

    /**
     * 2位
     *
     * @var CirclePageView|null
     */
    public ?CirclePageView $second_page_view;

    /**
     * 3位
     *
     * @var CircleValueObject|null
     */
    public ?CircleValueObject $third;

    /**
     * 3位
     *
     * @var CirclePageView|null
     */
    public ?CirclePageView $third_page_view;

    /**
     * 4位
     *
     * @var CircleValueObject|null
     */
    public ?CircleValueObject $fourth;

    /**
     * 4位
     *
     * @var CirclePageView|null
     */
    public ?CirclePageView $fourth_page_view;

    /**
     * 5位
     *
     * @var CircleValueObject|null
     */
    public ?CircleValueObject $fifth;

    /**
     * 5位
     *
     * @var CirclePageView|null
     */
    public ?CirclePageView $fifth_page_view;

    public function toArray(): array
    {
        return [
            'first'            => $this->first ? $this->first->toArray() : null,
            'first_page_view'  => $this->first_page_view ? [
                CirclePageViewProperty::circle_id    => $this->first_page_view->id,
                CirclePageViewProperty::active_users => $this->first_page_view->active_users,
                CirclePageViewProperty::page_views   => $this->first_page_view->page_views,
            ] : null,
            'second'           => $this->second ? $this->second->toArray() : null,
            'second_page_view'  => $this->second_page_view ? [
                CirclePageViewProperty::circle_id    => $this->second_page_view->id,
                CirclePageViewProperty::active_users => $this->second_page_view->active_users,
                CirclePageViewProperty::page_views   => $this->second_page_view->page_views,
            ] : null,
            'third'            => $this->third ? $this->third->toArray() : null,
            'third_page_view'  => $this->third_page_view ? [
                CirclePageViewProperty::circle_id    => $this->third_page_view->id,
                CirclePageViewProperty::active_users => $this->third_page_view->active_users,
                CirclePageViewProperty::page_views   => $this->third_page_view->page_views,
            ] : null,
            'fourth'           => $this->fourth ? $this->fourth->toArray() : null,
            'fourth_page_view'  => $this->fourth_page_view ? [
                CirclePageViewProperty::circle_id    => $this->fourth_page_view->id,
                CirclePageViewProperty::active_users => $this->fourth_page_view->active_users,
                CirclePageViewProperty::page_views   => $this->fourth_page_view->page_views,
            ] : null,
            'fifth'            => $this->fifth ? $this->fifth->toArray() : null,
            'fifth_page_view'  => $this->fifth_page_view ? [
                CirclePageViewProperty::circle_id    => $this->fifth_page_view->id,
                CirclePageViewProperty::active_users => $this->fifth_page_view->active_users,
                CirclePageViewProperty::page_views   => $this->fifth_page_view->page_views,
            ] : null,
        ];
    }
}
