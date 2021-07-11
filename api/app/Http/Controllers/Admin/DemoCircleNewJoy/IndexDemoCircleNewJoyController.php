<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\DemoCircleNewJoy;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Admin\DemoCircleNewJoy\IndexDemoCircleNewJoyUsecase;
use Illuminate\Http\Request;

final class IndexDemoCircleNewJoyController extends Controller
{
    private IndexDemoCircleNewJoyUsecase $indexDemoCircleNewJoyUsecase;

    public function __construct(IndexDemoCircleNewJoyUsecase $indexDemoCircleNewJoyUsecase)
    {
        $this->indexDemoCircleNewJoyUsecase = $indexDemoCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param Request $request
     *
     * @return array
     */
    public function __invoke(Request $request): array
    {
        return [
            'demoCircleNewJoys' => Arr::camel_keys(
                $this->indexDemoCircleNewJoyUsecase->invoke()->toArray()
            ),
        ];
    }
}
