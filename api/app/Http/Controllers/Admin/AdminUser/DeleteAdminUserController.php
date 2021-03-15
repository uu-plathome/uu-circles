<?php

namespace App\Http\Controllers\Admin\AdminUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminUser\DeleteAdminUserRequest;
use App\Models\AdminUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class DeleteAdminUserController extends Controller
{
    /**
     * @param Request $request
     * @param int $userId
     * @return bool[]
     * @throws ValidationException
     */
    public function __invoke(DeleteAdminUserRequest $request, int $userId): array
    {
        Log::debug("DeleteAdminUserController args userId=$userId");

        if (Auth::id() === $userId) {
            throw ValidationException::withMessages([
                'data' => '自身のアカウントは削除できません。他のアカウントにログインしてください。',
            ]);
        }

        $existAdminUserTwoOrMore = AdminUser::where('id', '<>', $userId)->exists();
        if (!$existAdminUserTwoOrMore) {
            throw ValidationException::withMessages([
                'data' => '管理者アカウントが一つしかありません。全てのアカウントを削除できません。',
            ]);
        }

        $user = User::findOrFail($userId);
        $user->adminUser()->delete();
        $user->delete();

        return [
            'status' => true
        ];
    }
}
