<?php

declare(strict_types=1);

namespace App\UseCases\Main\Circle\Dto;

use App\Models\Circle;
use App\Models\CircleHandbill;

/**
 * 一覧用のサークル情報.
 */
final class MainSimpleCircleDto
{
    // サークル名
    public string $name;

    // サークル slug
    public string $slug;

    // 新歓画像URL
    public string $handbill_image_url;

    /**
     * EloquentからDto生成.
     *
     * @param Circle         $circle
     * @param CircleHandbill $circleHandbill
     *
     * @return self
     */
    public static function byEloquent(
        Circle $circle,
        CircleHandbill $circleHandbill
    ): self {
        $dto = new self();
        $dto->name = $circle->name;
        $dto->slug = $circle->slug;
        $dto->handbill_image_url = $circleHandbill->image_url;

        return $dto;
    }

    public function toArray(): array
    {
        return [
            'name'               => $this->name,
            'slug'               => $this->slug,
            'handbill_image_url' => $this->handbill_image_url,
        ];
    }
}
