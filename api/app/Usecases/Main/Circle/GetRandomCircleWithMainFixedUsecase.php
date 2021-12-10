<?php

declare(strict_types=1);

namespace App\Usecases\Main\Circle;

use App\Enum\Property\CircleProperty;
use App\Models\Circle;
use App\Usecases\Main\Circle\Dto\MainSimpleCircleDto;
use App\Usecases\Main\Circle\Dto\MainSimpleCircleListDto;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

final class GetRandomCircleWithMainFixedUsecase
{
    const TTL = 60 * 10;

    /**
     * メイン画面に表示するサークルをランダムに取得
     * デモのサークルは取得しない.
     *
     * メイン画面に固定するサークルを優先的にとり、残りは適当にとって、合計 $limit 件取得する
     *
     * @param int $limit サークル取得数
     *
     * @return MainSimpleCircleListDto
     */
    public function invoke(int $limit = 12): MainSimpleCircleListDto
    {
        Log::debug('#GetRandomCircleWithMainFixedUsecase args', [
            'limit' => $limit,
        ]);

        // 「メイン画面に固定しているサークルのクエリ」
        $fixedCircles = Circle::with([
            'circleHandbill:circle_id,image_url',
        ])
            // 公開しているサークル
            ->whereRelease(true)
            // デモサークルの非表示
            ->whereIsOnlyDemo(false)
            // メイン画面に固定するサークル
            ->whereIsMainFixed(true)
            // 新歓ビラが登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->select([
                CircleProperty::id,
                CircleProperty::name,
                CircleProperty::slug,
                CircleProperty::is_main_fixed,
            ])
            ->take($limit);

        // 「メイン画面に固定していないサークルのクエリ」と「メイン画面に固定しているサークルのクエリ」のクエリの統合（Union）
        /** @var Circle $foundCircles */
        $foundCircles = Circle::with([
            'circleHandbill:circle_id,image_url',
        ])
            // 公開しているサークル
            ->whereRelease(true)
            // デモサークルの非表示
            ->whereIsOnlyDemo(false)
            // メイン画面に固定しないサークル
            ->whereIsMainFixed(false)
            // 新歓ビラが登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->select([
                CircleProperty::id,
                CircleProperty::name,
                CircleProperty::slug,
                CircleProperty::is_main_fixed,
            ])
            ->inRandomOrder()
            ->take($limit)
            ->union($fixedCircles)
            ->get();

        /**
         * 「メイン画面に固定していないサークルのクエリ」 0 ~ 12 件
         * 「メイン画面に固定しているサークルのクエリ」 12 件
         * の合計 24 件に対し、「メイン画面に固定しているサークル」を優先的に 12 件選ぶ処理
         *
         * メイン画面に固定しているサークルを取れるだけとり、次にメイン画面に固定していないサークルを取る
         * 最後にピックアップしたサークルをシャッフルする
         */
        $circles = $foundCircles->unique(CircleProperty::id)
            ->sortByDesc(CircleProperty::is_main_fixed)
            ->values()
            ->take($limit)
            ->shuffle();

        $dto = new MainSimpleCircleListDto();
        $dto->list = $circles->map(
            fn (Circle $circle) => MainSimpleCircleDto::byEloquent(
                $circle,
                $circle->circleHandbill
            )
        )->toArray();

        return $dto;
    }

    public static function getCacheKey(): string
    {
        $now = Carbon::now();
        $hours = $now->format('YmdH');
        $minutes_flag = floor($now->minute / 10);

        return 'GetRandomCircleWithMainFixedUsecase.'.$hours.'.'.$minutes_flag;
    }
}
