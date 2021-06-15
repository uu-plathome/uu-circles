<?php

declare(strict_types=1);

namespace App\Usecases\Admin;

use App\Models\Circle;
use App\Support\Arr;
use App\Usecases\Admin\Params\PaginateCircleUsecaseParams;
use App\ValueObjects\CircleValueObject;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

final class PaginateCircleUsecase
{
    /**
     * invoke
     *
     * @return CircleValueObject[]
     */
    public function invoke(PaginateCircleUsecaseParams $params): array
    {
        Log::debug("PaginateCircleUsecase args", [
            'PaginateCircleUsecaseParams' => $params,
        ]);

        $cursor = [];
        if ($params->id) {
            $cursor['circles.id'] = $params->id;
        }
        if ($params->updated_at) {
            $cursor['circle_information.updated_at'] = $params->updated_at;
        }

        $circles = Circle::with([
            'circleInformation',
            'circleHandbill',
        ])->hasByJoin('circleInformation')
            ->when($params->name, function ($query) use ($params) {
                $query->where(function ($query) use ($params) {
                    // カタカナに変換
                    $katakana = mb_convert_kana($params->name, "K");
                    $query->where('circles.name', 'like', "%$params->name%")
                        ->orWhere('circles.slug', "%$params->name%")
                        ->orWhere('circle_information.name_kana', 'like', "%$katakana%")
                        ->orWhere('circle_information.short_name', 'like', "%$params->name%")
                        ->orWhere('circle_information.prefix_name', 'like', "%$params->name%");
                });
            })
            ->lampager()
            ->forward($params->next)
            ->backward($params->previous)
            ->limit(10)
            ->orderByDesc('circle_information.updated_at')
            ->orderByDesc('circles.id')
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
