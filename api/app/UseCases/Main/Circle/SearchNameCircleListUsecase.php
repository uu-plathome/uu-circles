<?php

declare(strict_types=1);

namespace App\UseCases\Main\Circle;

use App\Enum\Property\CircleSearchWordProperty;
use App\Models\Circle;
use App\Models\CircleSearchWord;
use App\UseCases\Main\Circle\Dto\MainSimpleCircleDto;
use App\UseCases\Main\Circle\Dto\MainSimpleCircleListDto;
use App\UseCases\Main\Circle\Params\SearchNameCircleListParam;
use Illuminate\Support\Facades\Log;

final class SearchNameCircleListUsecase
{
    /**
     * サークルをテキストで検索する.
     * ただし、デモサークルは取得しない.
     *
     * @param SearchNameCircleListParam $param
     *
     * @return MainSimpleCircleListDto
     */
    public function invoke(SearchNameCircleListParam $param): MainSimpleCircleListDto
    {
        Log::debug('SearchNameCircleListUsecase', [
            'SearchNameCircleListParam' => $param,
        ]);

        // 検索ワードの保存
        $this->saveCircleSearchWord($param->name);

        $circles = Circle::with([
            'circleHandbill:circle_id,image_url',
        ])->whereRelease(true)
            ->whereIsOnlyDemo(false)
            // 新歓ビラが登録されているのものを取得
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
                $katakana = mb_convert_kana($param->name, 'K');
                $query->where('circles.name', 'like', "%$param->name%")
                    ->orWhere('circles.slug', "%$param->name%")
                    ->orWhere('circle_information.name_kana', 'like', "%$katakana%")
                    ->orWhere('circle_information.short_name', 'like', "%$param->name%")
                    ->orWhere('circle_information.prefix_name', 'like', "%$param->name%");
            })
            ->orderByDesc('circle_information.updated_at')
            ->get();

        $dto = new MainSimpleCircleListDto();
        $dto->list = $circles->map(
            fn (Circle $circle) => MainSimpleCircleDto::byEloquent(
                $circle,
                $circle->circleHandbill
            )
        )->toArray();

        return $dto;
    }

    /**
     * 検索ワードの保存.
     *
     * @param string $word
     */
    protected function saveCircleSearchWord(string $word)
    {
        (new CircleSearchWord())->fill([
            CircleSearchWordProperty::word => $word,
        ])->save();
    }
}
