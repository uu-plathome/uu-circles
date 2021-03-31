<?php

namespace App\Usecases\Main\Circle;

use App\Dto\MainDetailCircleDto;
use App\Entity\CircleTagEntity;
use App\Models\Circle;
use App\Models\CircleTag;
use App\ValueObjects\CircleValueObject;
use Illuminate\Support\Facades\Log;

class GetCircleBySlugUsecase
{
    /**
     * Slugからサークルを取得する
     *
     * @return MainDetailCircleDto
     */
    public function invoke(string $slug): MainDetailCircleDto
    {
        Log::debug("#GetCircleBySlugUsecase args", [
            'slug' => $slug,
        ]);

        /** @var Circle $circle */
        $circle = Circle::with([
            'circleInformation',
            'circleHandbill',
        ])->whereRelease(true)
            ->whereSlug($slug)
            ->firstOrFail();

        $foundCircleTag = CircleTag::whereCircleId($circle->id)->first();

        $circleTagEntity = CircleTagEntity::byEloquent(
            $circle->circleInformation,
            $foundCircleTag
        );

        $dto = new MainDetailCircleDto();
        $dto->circleValueObject = CircleValueObject::byEloquent(
            $circle,
            $circle->circleInformation,
            $circle->circleHandbill
        );
        $dto->circleTagEntity = $circleTagEntity;

        return $dto;
    }
}
