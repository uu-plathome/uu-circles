<?php

namespace App\Http\Controllers\Admin\AdminUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminUser\ShowAdminUserRequest;
use App\Models\User;
use App\Support\Arr;
use App\ValueObjects\AdminUserValueObject;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ShowAdminUserController extends Controller
{
    /**
     * @param Request $request
     * @param int $userId
     * @return array
     */
    public function __invoke(ShowAdminUserRequest $request, int $userId): array
    {
        Log::debug("ShowAdminUserController args userId=$userId");

        $user = User::findOrFail($userId);
        if (!$user->isAdminUser()) {
            throw new ModelNotFoundException();
        }

        return [
            'data' => Arr::camel_keys(AdminUserValueObject::byEloquent($user, $user->adminUser)->toArray())
        ];
    }
}
