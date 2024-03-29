<?php

declare(strict_types=1);

namespace App\UseCases\Main\CircleNewJoy;

use App\Enum\Property\CircleNewJoyProperty;
use App\Models\CircleNewJoy;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

final class GetCircleNewJoyAllPeriodWithLimitByCircleId
{
    /**
     * サークルIDを用いて、新歓一覧を取得する。
     *
     * ただし、
     * 1. 未来の新歓を$limit件取得する
     * 2. 未来の新歓を$limit件取得できないとき、追加で過去の新歓を$limit件に近づくまで取得する
     *
     * @return void
     */
    public function invoke(int $circleId, int $limit = 6): array
    {
        Log::debug('#GetCircleNewJoyAllPeriodWithLimitByCircleId args', [
            'circleId' => $circleId,
            'limit'    => $limit,
        ]);

        $now = Carbon::now();

        // 新歓開催前のものを取得
        $circleNewJoys = CircleNewJoy::whereCircleId($circleId)
            ->nowPublic($now)
            ->where(CircleNewJoyProperty::start_date, '>=', $now)
            ->orderBy(CircleNewJoyProperty::start_date)
            ->take($limit)
            ->get();

        // 新歓が$limit件に満たない時、過去の新歓も取得
        if ($circleNewJoys->count() >= $limit) {
            return $circleNewJoys->map(
                fn (CircleNewJoy $circleNewJoy) => CircleNewJoyValueObject::byEloquent($circleNewJoy)
            )->toArray();
        }

        $count = count($circleNewJoys);

        $appendCircleNewJoys = CircleNewJoy::whereCircleId($circleId)
            ->nowPublic($now)
            ->where(CircleNewJoyProperty::start_date, '<', $now)
            ->orderByDesc(CircleNewJoyProperty::start_date)
            ->take($limit - $count)
            ->get();

        $circleNewJoys = $circleNewJoys->concat($appendCircleNewJoys);

        return $circleNewJoys->map(
            fn (CircleNewJoy $circleNewJoy) => CircleNewJoyValueObject::byEloquent($circleNewJoy)
        )->toArray();
    }
}
