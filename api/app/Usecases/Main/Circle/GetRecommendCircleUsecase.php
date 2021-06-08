<?php

declare(strict_types=1);

namespace App\Usecases\Main\Circle;

use App\Usecases\Main\Circle\Dto\MainSimpleCircleListDto;
use Illuminate\Support\Carbon;

final class GetRecommendCircleUsecase
{
    const LIMIT = 6;

    const TTL = 60 * 2;

    private GetRandomCircleUsecase $getRandomCircleUsecase;

    public function __construct(
        GetRandomCircleUsecase $getRandomCircleUsecase
    ) {
        $this->getRandomCircleUsecase = $getRandomCircleUsecase;
    }

    /**
     * おすすめのサークル
     *
     * @return MainSimpleCircleListDto
     */
    public function invoke(): MainSimpleCircleListDto
    {
        return $this->getRandomCircleUsecase->invoke(self::LIMIT);
    }

    public static function getCacheKey(): string
    {
        $minutes = Carbon::now()->format('YmdHi');
        return 'RecommendCircles ' . $minutes;
    }
}
