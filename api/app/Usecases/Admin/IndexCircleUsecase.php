<?php

namespace App\Usecases\Admin;

use App\Models\Circle;
use App\Support\Arr;
use App\Usecases\Admin\Params\IndexCircleUsecaseParams;
use App\ValueObjects\CircleValueObject;
use Illuminate\Support\Collection;

class IndexCircleUsecase
{
    /**
     * invoke
     *
     * @return CircleValueObject[]
     */
    public function invoke(IndexCircleUsecaseParams $params): array
    {
        $cursor = [];
        if ($params->id)
            $cursor['id'] = $params->id;
        if ($params->updated_at)
            $cursor['updated_at'] = $params->updated_at;

        $circles = Circle::with([
            'circleInformation',
            'circleHandbill',
        ])->hasByNonDependentSubquery('circleInformation')
            ->lampager()
            ->forward($params->next)
            ->backward($params->previos)
            ->limit(10)
            ->orderByDesc('updated_at')
            ->orderByDesc('id')
            ->seekable()
            ->paginate($cursor)
            ->toArray(JSON_PRETTY_PRINT);

        $newCircles = (new Collection($circles['records']))->map(
            fn ($circle) =>
            CircleValueObject::byEloquent(
                $circle,
                $circle->circleInformation,
                $circle->circleHandbill
            )->toArray()
        )->all();

        Arr::set($circles, 'records', $newCircles);

        return $circles;
    }
}
