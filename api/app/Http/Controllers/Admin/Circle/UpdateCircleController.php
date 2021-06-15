<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Circle;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Circle\UpdateCircleFormRequest;
use App\Support\Arr;
use App\Usecases\Admin\UpdateCircleUsecase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

final class UpdateCircleController extends Controller
{
    private UpdateCircleUsecase $updateCircleUsecase;

    public function __construct(UpdateCircleUsecase $updateCircleUsecase)
    {
        $this->updateCircleUsecase = $updateCircleUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param UpdateCircleFormRequest $request
     *
     * @throws \Exception
     *
     * @return array
     */
    public function __invoke(UpdateCircleFormRequest $request, int $circleId): array
    {
        Log::debug('UpdateCircleController args none');

        $adminUser = Auth::adminUser();
        $role = $adminUser->role;

        $circle = $this->updateCircleUsecase->invoke(
            $request->makeCircleValueObject(),
            $role
        );

        return [
            'data' => Arr::camel_keys($circle->toArray()),
        ];
    }
}
