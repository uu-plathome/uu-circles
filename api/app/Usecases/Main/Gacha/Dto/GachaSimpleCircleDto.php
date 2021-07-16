<?php

declare(strict_types=1);

namespace App\Usecases\Main\Gacha\Dto;

use App\Models\Circle;
use App\Models\CircleHandbill;
use App\Models\CircleInformation;

/**
 * 一覧用のサークル情報.
 */
final class GachaSimpleCircleDto
{
    public int $circleId;

    // サークル名
    public string $name;

    // サークル slug
    public string $slug;

    // 新歓画像URL
    public string $handbill_image_url;

    // サークル説明分
    public ?string $description;

    // サークル種別
    public ?string $circle_type;

    // 部活か
    public bool $is_club_activities;

    /**
     * EloquentからDto生成.
     *
     * @param Circle            $circle
     * @param CircleInformation $circleInformation
     * @param CircleHandbill    $circleHandbill
     *
     * @return self
     */
    public static function byEloquent(
        Circle $circle,
        CircleInformation $circleInformation,
        CircleHandbill $circleHandbill
    ): self {
        $dto = new self();
        $dto->circleId = $circle->id;
        $dto->name = $circle->name;
        $dto->slug = $circle->slug;
        $dto->handbill_image_url = $circleHandbill->image_url;
        $dto->description = $circleInformation->description;
        $dto->circle_type = $circleInformation->circle_type;
        $dto->is_club_activities = !!$circleInformation->is_club_activities;

        return $dto;
    }

    public function toArray(): array
    {
        return [
            'name'               => $this->name,
            'slug'               => $this->slug,
            'handbill_image_url' => $this->handbill_image_url,
            'description'        => $this->description,
        ];
    }
}
