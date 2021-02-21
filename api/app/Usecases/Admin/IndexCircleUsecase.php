<?php

namespace App\Usecases\Admin;

use App\Models\Circle;
use App\Models\CircleHandbill;
use App\Models\CircleInformation;
use App\Support\Arr;
use App\Usecases\Admin\Params\IndexCircleUsecaseParams;
use App\ValueObjects\CircleValueObject;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Lampager\Laravel\PaginationResult;
use Lampager\Query;

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

        $circles = Circle::with([
            'circleInformation',
            'circleHandbill',
        ])->whereHas('circleInformation')
            ->lampager()
            ->forward()
            ->limit(1)
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
