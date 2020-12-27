<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\RegisterAdminFormRequest;
use App\Support\Arr;
use App\Usecases\RegisterAdminUserUsecase;
use Exception;

class RegisterAdminController extends Controller
{
    private RegisterAdminUserUsecase $registerAdminUserUsecase;

    public function __construct(
        RegisterAdminUserUsecase $registerAdminUserUsecase
    ) {
        $this->registerAdminUserUsecase = $registerAdminUserUsecase;
    }

    /**
     * @param RegisterAdminFormRequest $request
     * @return array
     * @throws Exception
     */
    public function __invoke(RegisterAdminFormRequest $request): array
    {
        $user = $this->registerAdminUserUsecase->invoke(
            $request->makeAdminUserValueObject()
        );

        return Arr::camel_keys([
            'data'   => $user,
            'status' => __('verification.sent')
        ]);
    }
}
