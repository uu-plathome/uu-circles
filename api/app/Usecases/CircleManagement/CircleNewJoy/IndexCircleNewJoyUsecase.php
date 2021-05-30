<?php

declare(strict_types=1);

namespace App\Usecases\CircleManagement\CircleNewJoy;

use App\Models\CircleNewJoy;
use App\Usecases\CircleManagement\CircleNewJoy\Dto\SeparateReleaseCircleNewJoyDto;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

final class IndexCircleNewJoyUsecase
{
    /**
     * 新歓一覧の取得
     *
     * @param int $circleId
     * @return SeparateReleaseCircleNewJoyDto
     */
    public function invoke(int $circleId): SeparateReleaseCircleNewJoyDto
    {
        Log::debug("IndexCircleNewJoyUsecase args circleId=$circleId");

        $circleNewJoys = CircleNewJoy::whereCircleId($circleId)->get();

        $circleNewJoyValueObjects = (new Collection($circleNewJoys))->map(
            fn (CircleNewJoy $circleNewJoy) => CircleNewJoyValueObject::byEloquent($circleNewJoy)
        );

        // 未来の公開中の新歓一覧
        $onReleasedFutureCircleNewJoys = $circleNewJoyValueObjects->filter(
            fn (CircleNewJoyValueObject $circleNewJoy) =>
            $circleNewJoy->release &&
                $circleNewJoy->start_date && $circleNewJoy->start_date->isFuture()
        )->toArray();

        // 未来の非公開の新歓一覧
        $onPrivateFutureCircleNewJoys = $circleNewJoyValueObjects->filter(
            fn (CircleNewJoyValueObject $circleNewJoy) =>
            !$circleNewJoy->release  &&
                $circleNewJoy->start_date && $circleNewJoy->start_date->isFuture()
        )->toArray();

        // 未来の公開中の新歓一覧
        $onReleasedPastCircleNewJoys = $circleNewJoyValueObjects->filter(
            fn (CircleNewJoyValueObject $circleNewJoy) =>
            $circleNewJoy->release &&
                $circleNewJoy->start_date && $circleNewJoy->start_date->isPast()
        )->toArray();

        // 未来の非公開の新歓一覧
        $onPrivatePastCircleNewJoys = $circleNewJoyValueObjects->filter(
            fn (CircleNewJoyValueObject $circleNewJoy) =>
            !$circleNewJoy->release  &&
                $circleNewJoy->start_date && $circleNewJoy->start_date->isPast()
        )->toArray();

        $dto = new SeparateReleaseCircleNewJoyDto();
        $dto->on_release_past = $onReleasedPastCircleNewJoys;
        $dto->on_release_future = $onReleasedFutureCircleNewJoys;
        $dto->on_private_past = $onPrivatePastCircleNewJoys;
        $dto->on_private_future = $onPrivateFutureCircleNewJoys;

        return $dto;
    }
}
