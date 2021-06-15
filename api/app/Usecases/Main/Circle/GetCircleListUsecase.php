<?php

declare(strict_types=1);

namespace App\Usecases\Main\Circle;

use App\Models\Circle;
use App\Usecases\Main\Circle\Dto\MainSimpleCircleDto;
use App\Usecases\Main\Circle\Dto\MainSimpleCircleListDto;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

final class GetCircleListUsecase
{
    const TTL = 60;

    /**
     * 全てのサークルを取得する.
     *
     * @return MainSimpleCircleListDto
     */
    public function invoke(): MainSimpleCircleListDto
    {
        Log::debug('#GetCircleListUsecase args: none');

        $circles = Circle::with([
            'circleInformation:circle_id',
            'circleHandbill:circle_id,image_url',
        ])->whereRelease(true)
            // 新歓が登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->select([
                'circles.'.'id',
                'circles.'.'name',
                'circles.'.'release',
                'circles.'.'slug',
            ])
            ->join('circle_information', 'circle_information.circle_id', '=', 'circles.id')
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

    public static function getCacheKey(): string
    {
        $minutes = Carbon::now()->format('YmdHi');

        return 'main.circle.GetCircleListUsecase.'.$minutes;
    }
}
