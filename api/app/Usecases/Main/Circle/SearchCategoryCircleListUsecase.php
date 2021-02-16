<?php

namespace App\Usecases\Main\Circle;

use App\Enum\CircleType;
use App\Models\Circle;
use App\Usecases\Main\Circle\Params\SearchCategoryCircleListParam;
use App\ValueObjects\CircleValueObject;

class SearchCategoryCircleListUsecase
{
    public function invoke(SearchCategoryCircleListParam $param): array
    {
        $circleType = [];
        if ($param->officialOrganization) {
            $circleType[] = CircleType::OFFICIAL_ORGANIZATION;
        }
        if ($param->unofficialOrganization) {
            $circleType[] = CircleType::UNOFFICIAL_ORGANIZATION;
        }
        if ($param->sendingOrganization) {
            $circleType[] = CircleType::SENDING_ORGANIZATION;
        }
        if ($param->studentGroup) {
            $circleType[] = CircleType::STUDENT_GROUP;
        }

        $circles = Circle::with([
            'circleInformation:circle_id,name',
            'circleHandbill:circle_id,image_url',
        ])->whereRelease(true)
            // 新歓が登録されているのものを取得
            ->whereHas('circleHandbill')
            ->whereHas('circleInformation', function ($query) use ($param, $circleType) {
                /** @var \App\Models\CircleInformation $query */
                $query->when($param->club, function ($query) {
                    /** @var \App\Models\CircleInformation $query */
                    $query->whereIsClubActivities(true);
                })->when(count($circleType) > 0, function ($query) use ($circleType) {
                    /** @var \App\Models\CircleInformation $query */
                    $query->whereIn('circle_type', $circleType);
                });
            })
            ->select([
                'circles.' . 'id',
                'circles.' . 'release',
                'circles.' . 'slug'
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
        )->toArray();
    }
}
