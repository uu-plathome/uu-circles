<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\DemoCircleNewJoy;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\AdminManagement\DemoCircleNewJoy\ShowDemoCircleNewJoyUsecase;
use Illuminate\Http\Request;

final class ShowDemoCircleNewJoyController extends Controller
{
    private ShowDemoCircleNewJoyUsecase $showDemoCircleNewJoyUsecase;

    public function __construct(ShowDemoCircleNewJoyUsecase $showDemoCircleNewJoyUsecase)
    {
        $this->showDemoCircleNewJoyUsecase = $showDemoCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param int     $circleId
     * @param int     $circleNewJoyId
     *
     * @return array
     */
    public function __invoke(Request $request, int $demoCircleNewJoyId): array
    {
        $demoCircleNewJoy = $this->showDemoCircleNewJoyUsecase->invoke($demoCircleNewJoyId);

        return [
            'demoCircleNewJoy' => Arr::camel_keys($demoCircleNewJoy->toArray()),
        ];
    }
}
