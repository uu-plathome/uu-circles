<?php

namespace App\Http\Controllers\Admin\AdminUser;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class DeleteAdminUserController extends Controller
{
    public function __invoke(Request $request, int $userId): array
    {
        if (Auth::id() === $userId) {
            ValidationException::withMessages([
                'data' => '自身のアカウントは削除できません。他のアカウントにログインしてください。',
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
