<?php

declare(strict_types=1);

namespace App\UseCases\AdminManagement\DemoCircleNewJoy;

use App\Models\DemoCircleNewjoy;
use App\UseCases\AdminManagement\DemoCircleNewJoy\Dto\MultipleDemoCircleNewJoyDto;
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

        $demoCircleNewJoys = DemoCircleNewjoy::with('circle')
            ->get();

        return MultipleDemoCircleNewJoyDto::byEloquent($demoCircleNewJoys);
    }
}
