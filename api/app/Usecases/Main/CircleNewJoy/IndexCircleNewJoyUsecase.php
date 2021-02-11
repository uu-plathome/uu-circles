<?php

namespace App\Usecases\Main\CircleNewJoy;

use App\Enum\CircleNewJoyModel;
use App\Models\Circle;
use App\Models\CircleNewJoy;
use App\ValueObjects\CircleNewJoyValueObject;
use App\ValueObjects\CircleValueObject;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class IndexCircleNewJoyUsecase
{
    /**
     * 新歓一覧の取得
     *
     * @return void
     */
    public function invoke(int $circleId)
    {
        $circleNewJoys = CircleNewJoy::nowPublic(Carbon::now())
            ->whereCircleId($circleId)
            ->orderBy(CircleNewJoyModel::start_date)
            ->get();

        $mapCircleNewJoys = $this->splitBeforeOrAfter($circleNewJoys);

        return [
            // 新歓開催済み
            'pastCircleNewJoys' => $mapCircleNewJoys['past']->map(
                fn (CircleNewJoy $circleNewJoy) => CircleNewJoyValueObject::byEloquent($circleNewJoy)
            )->toArray(),
            // 新歓開催前
            'futureCircleNewJoys' => $mapCircleNewJoys['future']->map(
                fn (CircleNewJoy $circleNewJoy) => CircleNewJoyValueObject::byEloquent($circleNewJoy)
            )->toArray(),
            // 現在開催中
            'nowCircleNewJoys' => $mapCircleNewJoys['now']->map(
                fn (CircleNewJoy $circleNewJoy) => CircleNewJoyValueObject::byEloquent($circleNewJoy)
            )->toArray(),
            // 今日の新歓
            'todayCircleNewJoys' => $mapCircleNewJoys['today']->map(
                fn (CircleNewJoy $circleNewJoy) => CircleNewJoyValueObject::byEloquent($circleNewJoy)
            )->toArray(),
        ];
    }

    /**
     * Undocumented function
     *
     * @param @var \Illuminate\Database\Eloquent\Collection<mixed, (\Illuminate\Database\Eloquent\Builder|\App\Models\CircleNewJoy)> $circleNewJoys
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

                return false;
            }
        );

        $today = $circleNewJoys->filter(
            function (CircleNewJoy $circleNewJoy) {
                if ($circleNewJoy->start_date && $circleNewJoy->end_date) {
                    $startDate = new Carbon($circleNewJoy->start_date);
                    $endDate = new Carbon($circleNewJoy->end_date);

                    return $startDate->isToday() || $endDate->isToday();
                }

                return false;
            }
        );

        $now = $circleNewJoys->filter(
            function (CircleNewJoy $circleNewJoy) {
                if ($circleNewJoy->start_date && $circleNewJoy->end_date) {
                    $startDate = new Carbon($circleNewJoy->start_date);
                    $endDate = new Carbon($circleNewJoy->end_date);

                    return Carbon::now()->between($startDate, $endDate);
                }

                return false;
            }
        );

        $future = $circleNewJoys->filter(
            function (CircleNewJoy $circleNewJoy) {
                if ($circleNewJoy->start_date && $circleNewJoy->end_date) {
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
