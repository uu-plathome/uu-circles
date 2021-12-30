<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\AdminUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminUser\IndexAdminUserRequest;
use App\Support\Arr;
use App\Usecases\Admin\AdminUser\IndexAdminUserUsecase;
use App\ValueObjects\AdminUserValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

final class IndexAdminUserController extends Controller
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
     *
     * @return array
     */
    public function __invoke(IndexAdminUserRequest $request): array
    {
        Log::debug('IndexAdminUserController args none');

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
