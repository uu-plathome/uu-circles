<?php

declare(strict_types=1);

namespace App\UseCases\Main\CircleNewJoy;

use App\Enum\Property\CircleNewJoyProperty;
use App\Models\CircleNewJoy;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

final class IndexCircleNewJoyUsecase
{
    /**
     * 新歓一覧の取得.
     *
     * 第2引数のcircleNewJoyIdを指定すると、検索結果から探す。
     *
     * @return void
     */
    public function invoke(int $circleId, ?int $circleNewJoyId = null)
    {
        Log::debug('#IndexCircleNewJoyUsecase args', [
            'circleId'       => $circleId,
            'circleNewJoyId' => $circleNewJoyId,
        ]);

        $circleNewJoys = CircleNewJoy::nowPublic(Carbon::now())
            ->whereCircleId($circleId)
            ->orderBy(CircleNewJoyProperty::start_date)
            ->get();

        $circleNewJoy = $circleNewJoyId ? $circleNewJoys->first(
            fn (CircleNewJoy $circleNewJoy) => $circleNewJoy->id === $circleNewJoyId
        ) : null;
        $mapCircleNewJoys = $this->splitBeforeOrAfter($circleNewJoys);

        return [
            'circleNewJoy'      => $circleNewJoy,
            // 新歓開催済み
            'pastCircleNewJoys' => $mapCircleNewJoys['past']->sortByDesc('start_date')
                ->map(
                    fn (CircleNewJoy $circleNewJoy) => CircleNewJoyValueObject::byEloquent($circleNewJoy)
                )->toArray(),
            // 新歓開催前
            'futureCircleNewJoys'               => $mapCircleNewJoys['future']->sortBy('start_date')->map(
                fn (CircleNewJoy $circleNewJoy) => CircleNewJoyValueObject::byEloquent($circleNewJoy)
            )->toArray(),
            // 現在開催中
            'nowCircleNewJoys'                  => $mapCircleNewJoys['now']->sortBy('start_date')->map(
                fn (CircleNewJoy $circleNewJoy) => CircleNewJoyValueObject::byEloquent($circleNewJoy)
            )->toArray(),
            // 今日の新歓
            'todayCircleNewJoys'                => $mapCircleNewJoys['today']->sortBy('start_date')->map(
                fn (CircleNewJoy $circleNewJoy) => CircleNewJoyValueObject::byEloquent($circleNewJoy)
            )->toArray(),
        ];
    }

    /**
     * Undocumented function.
     *
     * @param @var \Illuminate\Database\Eloquent\Collection<mixed, (\Illuminate\Database\Eloquent\Builder|\App\Models\CircleNewJoy)> $circleNewJoys
     *
     * @return array
     */
    private function splitBeforeOrAfter(Collection $circleNewJoys): array
    {
        $past = $circleNewJoys->filter(
            function (CircleNewJoy $circleNewJoy) {
                if ($circleNewJoy->start_date && $circleNewJoy->end_date) {
                    $endDate = new Carbon($circleNewJoy->end_date);

                    return $endDate->isPast();
                }

                if ($circleNewJoy->start_date) {
                    $endDate = new Carbon($circleNewJoy->start_date);

                    return $endDate->isPast();
                }

                if ($circleNewJoy->end_date) {
                    $endDate = new Carbon($circleNewJoy->end_date);

                    return $endDate->isPast();
                }

                return false;
            }
        );

        $today = $circleNewJoys->filter(
            function (CircleNewJoy $circleNewJoy) {
                if ($circleNewJoy->start_date) {
                    $startDate = new Carbon($circleNewJoy->start_date);

                    return $startDate->isToday();
                }

                if ($circleNewJoy->end_date) {
                    $endDate = new Carbon($circleNewJoy->end_date);

                    return $endDate->isToday();
                }

                return false;
            }
        );

        $now = $circleNewJoys->filter(
            function (CircleNewJoy $circleNewJoy) {
                if (!($circleNewJoy->start_date && $circleNewJoy->end_date)) {
                    return false;
                }

                $startDate = new Carbon($circleNewJoy->start_date);
                $endDate = new Carbon($circleNewJoy->end_date);

                return Carbon::now()->between($startDate, $endDate);
            }
        );

        $future = $circleNewJoys->filter(
            function (CircleNewJoy $circleNewJoy) {
                if ($circleNewJoy->start_date) {
                    $startDate = new Carbon($circleNewJoy->start_date);

                    return $startDate->isFuture();
                }

                return false;
            }
        );

        return [
            /** 新歓開催済み */
            'future' => $future,
            /** 今日の新歓 */
            'today'  => $today,
            /** 現在開催中 */
            'now'    => $now,
            /** 新歓開催前 */
            'past'   => $past,
        ];
    }
}
