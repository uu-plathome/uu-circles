<?php

declare(strict_types=1);

namespace App\Usecases\Admin\DemoCircleNewJoy;

use App\Models\DemoCircleNewJoy;
use App\Usecases\Admin\DemoCircleNewJoy\Dto\DemoCircleDto;
use App\Usecases\Admin\DemoCircleNewJoy\Dto\MultipleDemoCircleNewJoyDto;
use Illuminate\Support\Facades\Log;

final class ShowDemoCircleNewJoyUsecase
{
    /**
     * デモ新歓一覧を取得.
     *
     * @return MultipleDemoCircleNewJoyDto
     */
    public function invoke(int $demoCircleNewJoyId): DemoCircleDto
    {
        Log::debug('IndexDemoCircleNewJoyUsecase args none');

        /** @var \App\Models\DemoCircleNewJoy $demoCircleNewJoy */
        $demoCircleNewJoy = DemoCircleNewJoy::with('circle')
            ->findOrFail($demoCircleNewJoyId);

        return DemoCircleDto::byEloquent(
            $demoCircleNewJoy->circle,
            $demoCircleNewJoy
        );
    }
}
