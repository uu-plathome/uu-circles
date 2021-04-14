<?php

namespace App\Http\Controllers\Admin\Circle;

use App\Enum\Property\CircleInformationProperty;
use App\Enum\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Circle\UpdateCircleFormRequest;
use App\Support\Arr;
use App\Usecases\Admin\UpdateCircleUsecase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UpdateCircleController extends Controller
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
     * @return array
     * @throws \Exception
     */
    public function __invoke(UpdateCircleFormRequest $request): array
    {
        Log::debug('UpdateCircleController args none');

        $adminUser = Auth::adminUser();
        $role = $adminUser->role;

        if ($role === Role::SYSTEM) {
            $request->validate([
                CircleInformationProperty::wp_url => ['nullable', 'string', 'url', 'max:255'],
                CircleInformationProperty::is_view_wp_post => ['nullable', 'boolean'],
            ]);
        }

        $circle = $this->updateCircleUsecase->invoke(
            $request->makeCircleValueObject(),
            $role
        );

        return [
            'data' => Arr::camel_keys($circle->toArray())
        ];
    }
}
