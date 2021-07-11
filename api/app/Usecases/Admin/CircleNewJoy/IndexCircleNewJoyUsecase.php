<?php

declare(strict_types=1);

namespace App\Usecases\Admin\CircleNewJoy;

use App\Models\CircleNewJoy;
use App\Usecases\Admin\CircleNewJoy\Dto\MultipleCircleNewJoyDto;
use Illuminate\Support\Facades\Log;

final class IndexCircleNewJoyUsecase
{
    /**
     * 新歓一覧の取得.
     *
     * @param int $circleId
     *
     * @return MultipleCircleNewJoyDto
     */
    public function invoke(int $circleId): MultipleCircleNewJoyDto
    {
        Log::debug("IndexCircleNewJoyUsecase args circleId=$circleId");

        $circleNewJoys = CircleNewJoy::with('circle')
            ->whereCircleId($circleId)
            ->get();

        return MultipleCircleNewJoyDto::byEloquent($circleNewJoys);
    }
}
