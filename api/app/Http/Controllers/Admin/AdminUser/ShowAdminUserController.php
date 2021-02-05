<?php

namespace App\Http\Controllers\Admin\AdminUser;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Support\Arr;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ShowAdminUserController extends Controller
{
    /**
     * @param Request $request
     * @param int $userId
     * @return array
     */
    public function __invoke(Request $request, int $userId): array
    {
        $user = User::findOrFail($userId);
        if (!$user->isAdminUser()) {
            throw new ModelNotFoundException();
        }

        return [
            'data' => Arr::camel_keys($user->toArray()),
        ];
    }
}
