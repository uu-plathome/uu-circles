<?php

declare(strict_types=1);

namespace App\Usecases\Main\Statistics\Dto;

use App\Models\Circle;
use App\Models\CircleHandbill;
use App\Models\CircleInformation;

/**
 * 統計のためのサークル情報.
 */
final class CircleForStatisticsDto
{
    public ?string $slug;
    public string $name;
    public ?string $circle_type;
    public ?string $name_kana;
    public ?string $short_name;
    public ?string $prefix_name;
    public ?int $admission_fee_per_year;
    public ?int $weekly_activity_days;
    public ?bool $active_activity;
    public ?int $number_of_members;
    public ?string $main_image_url;
    public ?string $handbill_image_url;

    public static function byEloquent(
        Circle $circle,
        CircleInformation $circleInformation,
        CircleHandbill $circleHandbill
    ): self {
        $dto = new self();
        $dto->slug = $circle->slug;
        $dto->name = $circle->name;
        $dto->circle_type = $circleInformation->circle_type;
        $dto->name_kana = $circleInformation->name_kana;
        $dto->short_name = $circleInformation->short_name;
        $dto->prefix_name = $circleInformation->prefix_name;
        $dto->admission_fee_per_year = $circleInformation->admission_fee_per_year;
        $dto->weekly_activity_days = $circleInformation->weekly_activity_days;
        $dto->active_activity = $circleInformation->active_activity;
        $dto->number_of_members = $circleInformation->number_of_members;
        $dto->main_image_url = $circleInformation->main_image_url;
        $dto->handbill_image_url = $circleHandbill->main_image_url;

        return $dto;
    }

    public function toArray(): array
    {
        return [
            'slug'                   => $this->slug,
            'name'                   => $this->name,
            'circle_type'            => $this->circle_type,
            'name_kana'              => $this->name_kana,
            'short_name'             => $this->short_name,
            'prefix_name'            => $this->prefix_name,
            'admission_fee_per_year' => $this->admission_fee_per_year,
            'weekly_activity_days'   => $this->weekly_activity_days,
            'active_activity'        => $this->active_activity,
            'number_of_members'      => $this->number_of_members,
            'main_image_url'         => $this->main_image_url,
            'handbill_image_url'     => $this->handbill_image_url,
        ];
    }
}
