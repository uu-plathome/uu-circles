<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Circle;

use App\Enum\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Circle\UpdateCircleFormRequest;
use App\UseCases\AdminManagement\Circle\UpdateCircleForSystemUsecase;
use App\UseCases\AdminManagement\Circle\UpdateCircleUsecase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

final class UpdateCircleController extends Controller
{
    private UpdateCircleUsecase $updateCircleUsecase;

    private UpdateCircleForSystemUsecase $updateCircleForSystemUsecase;

    public function __construct(
        UpdateCircleUsecase $updateCircleUsecase,
        UpdateCircleForSystemUsecase $updateCircleForSystemUsecase
    ) {
        $this->updateCircleUsecase = $updateCircleUsecase;
        $this->updateCircleForSystemUsecase = $updateCircleForSystemUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param UpdateCircleFormRequest $request
     * @param int                     $circleId
     *
     * @throws \Exception
     *
     * @return array
     */
    public function __invoke(UpdateCircleFormRequest $request, int $circleId)
    {
        Log::debug('UpdateCircleController args', [
            'circleId' => $circleId,
        ]);

        $adminUser = Auth::adminUser();
        $role = $adminUser->role;

        if ($role === Role::SYSTEM) {
            $this->updateCircleForSystemUsecase->invoke(
                $request->makeUpdateCircleForSystemUsecaseParam()
            );

            return;
        }

        $this->updateCircleUsecase->invoke(
            $request->makeUpdateCircleUsecaseParam(),
        );
    }
}
