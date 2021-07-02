<?php

declare(strict_types=1);

namespace App\Usecases\Admin\DemoCircleNewJoy;

use App\Models\DemoCircleNewJoy;
use App\Usecases\Admin\DemoCircleNewJoy\Dto\MultipleDemoCircleNewJoyDto;
use Illuminate\Support\Facades\Log;

final class IndexDemoCircleNewJoyUsecase
{
    /**
     * デモ新歓一覧を取得.
     *
     * @return MultipleDemoCircleNewJoyDto
     */
    public function invoke(): MultipleDemoCircleNewJoyDto
    {
        Log::debug('IndexDemoCircleNewJoyUsecase args none');

        $demoCircleNewJoys = DemoCircleNewJoy::with('circle')
            ->get();

        return MultipleDemoCircleNewJoyDto::byEloquent($demoCircleNewJoys);
    }
}
