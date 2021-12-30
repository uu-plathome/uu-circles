<?php

declare(strict_types=1);

namespace App\UseCases\Main\DemoCircleNewJoy;

use App\Enum\DemoCircleNewjoyType;
use App\Enum\Property\CircleNewJoyProperty;
use App\Models\DemoCircleNewjoy;
use App\UseCases\Main\DemoCircleNewJoy\Dto\DemoCircleNewJoyDto;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

final class IndexDemoCircleNewJoyUsecase
{
    /**
     * デモ新歓一覧の取得.
     *
     * 第2引数のcircleNewJoyIdを指定すると、検索結果から探す。
     *
     * @return void
     */
    public function invoke(int $circleId, ?int $demoCircleNewJoyId = null)
    {
        Log::debug('IndexDemoCircleNewJoyUsecase args', [
            'circleId'           => $circleId,
            'demoCircleNewJoyId' => $demoCircleNewJoyId,
        ]);

        $circleNewJoys = DemoCircleNewjoy::whereCircleId($circleId)
            ->orderBy(CircleNewJoyProperty::start_date)
            ->get();

        $circleNewJoy = $demoCircleNewJoyId ? $circleNewJoys->first(
            fn (DemoCircleNewjoy $circleNewJoy) => $circleNewJoy->id === $demoCircleNewJoyId
        ) : null;
        $mapCircleNewJoys = $this->splitBeforeOrAfter($circleNewJoys);

        return [
            'circleNewJoy'      => $circleNewJoy,
            // 新歓開催済み
            'pastCircleNewJoys' => $mapCircleNewJoys['past']->sortByDesc('start_date')
                ->map(
                    fn (DemoCircleNewjoy $circleNewJoy) => DemoCircleNewJoyDto::byEloquent($circleNewJoy)
                )->toArray(),
            // 新歓開催前
            'futureCircleNewJoys'                   => $mapCircleNewJoys['future']->sortBy('start_date')->map(
                fn (DemoCircleNewjoy $circleNewJoy) => DemoCircleNewJoyDto::byEloquent($circleNewJoy)
            )->toArray(),
            // 現在開催中
            'nowCircleNewJoys'                      => $mapCircleNewJoys['now']->sortBy('start_date')->map(
                fn (DemoCircleNewjoy $circleNewJoy) => DemoCircleNewJoyDto::byEloquent($circleNewJoy)
            )->toArray(),
            // 今日の新歓
            'todayCircleNewJoys'                    => $mapCircleNewJoys['today']->sortBy('start_date')->map(
                fn (DemoCircleNewjoy $circleNewJoy) => DemoCircleNewJoyDto::byEloquent($circleNewJoy)
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
        $past = new Collection();

        $today = $circleNewJoys->filter(
            function (DemoCircleNewjoy $circleNewJoy) {
                return $circleNewJoy->demo_circle_newjoy_type = DemoCircleNewjoyType::TODAY;
            }
        );

        $now = $circleNewJoys->filter(
            function (DemoCircleNewjoy $circleNewJoy) {
                return $circleNewJoy->demo_circle_newjoy_type = DemoCircleNewjoyType::NOW;
            }
        );

        $future = $circleNewJoys->filter(
            function (DemoCircleNewjoy $circleNewJoy) {
                return $circleNewJoy->demo_circle_newjoy_type = DemoCircleNewjoyType::FUTURE;
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
