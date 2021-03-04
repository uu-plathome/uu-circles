<?php

namespace App\Usecases\Main\Circle;

use App\Models\Circle;
use App\Usecases\Main\Circle\Params\SearchNameCircleListParam;
use App\ValueObjects\CircleValueObject;

class SearchNameCircleListUsecase
{
    public function invoke(SearchNameCircleListParam $param)
    {
        $circles = Circle::with([
            'circleHandbill:circle_id,image_url',
        ])->whereRelease(true)
            // 新歓が登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->select([
                'circles.id',
                'circles.name',
                'circles.release',
                'circles.slug',
                'circle_information.name_kana',
                'circle_information.short_name',
                'circle_information.prefix_name',
            ])
            ->join('circle_information', 'circle_information.circle_id', '=', 'circles.id')
            ->where(function ($query) use ($param) {
                // カタカナに変換
                $katakana = mb_convert_kana($param->name, "K");
                $query->where('circles.name', 'like', "%$param->name%")
                    ->orWhere('circles.slug', "%$param->name%")
                    ->orWhere('circle_information.name_kana', 'like', "%$katakana%")
                    ->orWhere('circle_information.short_name', 'like', "%$param->name%")
                    ->orWhere('circle_information.prefix_name', 'like', "%$param->name%");
            })
            ->orderByDesc('circle_information.updated_at')
            ->get();

        return $circles->map(
            fn (Circle $circle) =>
            CircleValueObject::byEloquent(
                $circle,
                null,
                $circle->circleHandbill
            )
        )->toArray();
    }
}
