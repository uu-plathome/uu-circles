<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Circle;

use App\Usecases\Admin\CreateCircleUsecase;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Circle\CreateCircleFormRequest;
use App\Support\Arr;
use Illuminate\Support\Facades\Log;

final class CreateCircleController extends Controller
{
    private CreateCircleUsecase $createCircleUsecase;

    public function __construct(CreateCircleUsecase $createCircleUsecase)
    {
        $this->createCircleUsecase = $createCircleUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param CreateCircleFormRequest $request
     * @return array
     * @throws \Exception
     */
    public function __invoke(CreateCircleFormRequest $request)
    {
        Log::debug("CreateCircleController args none");

        $circle = $this->createCircleUsecase->invoke(
            $request->makeCircleValueObject()
        );

        return [
            'data' => Arr::camel_keys($circle->toArray())
        ];
    }
}
