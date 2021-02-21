<?php

namespace App\Http\Controllers\Admin\AdminUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminUser\IndexAdminUserRequest;
use App\Support\Arr;
use App\Usecases\Admin\IndexAdminUserUsecase;
use App\ValueObjects\AdminUserValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class IndexAdminUserController extends Controller
{
    private IndexAdminUserUsecase $indexAdminUserUsecase;

    public function __construct(IndexAdminUserUsecase $indexAdminUserUsecase)
    {
        $this->indexAdminUserUsecase = $indexAdminUserUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @return array
     */
    public function __invoke(IndexAdminUserRequest $request): array
    {
        $users = $this->indexAdminUserUsecase->invoke(Auth::user()->adminUser->role);

        return [
            'data' => Arr::camel_keys(
                (new Collection($users))->map(
                    fn (AdminUserValueObject $user) => $user->toArray()
                )->all()
            ),
        ];
    }
}
