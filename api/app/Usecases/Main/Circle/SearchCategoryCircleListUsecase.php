<?php

declare(strict_types=1);

namespace App\Usecases\Main\Circle;

use App\Enum\CircleType;
use App\Models\Circle;
use App\Usecases\Main\Circle\Dto\MainSimpleCircleDto;
use App\Usecases\Main\Circle\Dto\MainSimpleCircleListDto;
use App\Usecases\Main\Circle\Params\SearchCategoryCircleListParam;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Log;

final class SearchCategoryCircleListUsecase
{
    /**
     * カテゴリー検索をする
     *
     * @param SearchCategoryCircleListParam $param
     * @return MainSimpleCircleListDto
     */
    public function invoke(SearchCategoryCircleListParam $param): MainSimpleCircleListDto
    {
        Log::debug("#SearchCategoryCircleListParam args", [
            'param' => $param
        ]);

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
            'circleHandbill:circle_id,image_url',
        ])->whereRelease(true)
            // 新歓が登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->hasByNonDependentSubquery('circleInformation', function (HasOne $query) use ($param, $circleType) {
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
                'circles.' . 'name',
                'circles.' . 'release',
                'circles.' . 'slug'
            ])
            ->join('circle_information', 'circle_information.circle_id', '=', 'circles.id')
            ->orderByDesc('circle_information.updated_at')
            ->get();

        $dto = new MainSimpleCircleListDto();
        $dto->list = $circles->map(
            fn (Circle $circle) =>
                MainSimpleCircleDto::byEloquent(
                    $circle,
                    $circle->circleHandbill
                )
        )->toArray();
        return $dto;
    }
}
