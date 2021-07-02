<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\DemoCircleNewJoy;

use App\Http\Controllers\Controller;
use App\Models\Circle;
use App\Support\Arr;
use App\Usecases\Admin\DemoCircleNewJoy\IndexDemoCircleNewJoyUsecase;
use App\Usecases\Admin\IndexCircleNewJoyUsecase;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

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
