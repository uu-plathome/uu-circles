<?php

namespace App\Usecases\Main\Circle;

use App\Models\Circle;
use App\ValueObjects\CircleValueObject;
use Illuminate\Support\Facades\Log;

class GetCircleBySlugUsecase
{
    /**
     * Slugからサークルを取得する
     *
     * @return CircleValueObject
     */
    public function invoke(string $slug): CircleValueObject
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

        return CircleValueObject::byEloquent(
            $circle,
            $circle->circleInformation,
            $circle->circleHandbill
        );
    }
}
