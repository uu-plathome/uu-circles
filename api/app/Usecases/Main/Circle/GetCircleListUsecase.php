<?php

declare(strict_types=1);

namespace App\Usecases\Main\Circle;

use App\Models\Circle;
use App\ValueObjects\CircleValueObject;
use Illuminate\Support\Facades\Log;

final class GetCircleListUsecase
{
    /**
     * サークルを取得する
     *
     * @return CircleValueObject[]
     */
    public function invoke()
    {
        Log::debug("#GetCircleListUsecase args: none");

        $circles = Circle::with([
            'circleInformation:circle_id',
            'circleHandbill:circle_id,image_url',
        ])->whereRelease(true)
            // 新歓が登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->select([
                'circles.' . 'id',
                'circles.' . 'name',
                'circles.' . 'release',
                'circles.' . 'slug',
            ])
            ->join('circle_information', 'circle_information.circle_id', '=', 'circles.id')
            ->orderByDesc('circle_information.updated_at')
            ->get();

        return $circles->map(
            fn (Circle $circle) =>
            CircleValueObject::byEloquent(
                $circle,
                $circle->circleInformation,
                $circle->circleHandbill
            )
        );
    }
}
