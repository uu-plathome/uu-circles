<?php

declare(strict_types=1);

namespace App\Usecases\Main\Gacha;

use App\Models\Circle;
use App\Models\CircleGachaResult;
use App\Usecases\Main\Gacha\Dto\GachaHistoryDto;

final class GachaHistoryByIdentifierHashUsecase
{
    public function invoke(string $identifierHash): GachaHistoryDto
    {
        $circleGachaResults = CircleGachaResult::whereIdentifierHash($identifierHash)
            ->get();

        // ガチャ結果に関する Circle ID 一覧
        $circleIdsMadeByCirclesGachaResutls = $circleGachaResults->map(
            fn (CircleGachaResult $circleGachaResult) => json_decode($circleGachaResult->result_circle_ids)
        )->flatten()
            ->toArray();

        $circles = Circle::with([
            'circleHandbill:circle_id,image_url',
        ])->whereRelease(true)
            ->whereIn('id', $circleIdsMadeByCirclesGachaResutls)
            // 新歓が登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->select([
                'id', 'name', 'slug',
            ])
            ->get();

        return GachaHistoryDto::byEloquent(
            $circles,
            $circleGachaResults
        );
    }
}
