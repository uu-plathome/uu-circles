<?php

namespace App\Http\Controllers\Admin\CircleUser;

use App\Http\Controllers\Controller;
use App\Models\Circle;
use App\Models\User;
use Illuminate\Http\Request;

class DeleteCircleUserController extends Controller
{
    public function __invoke(Request $request, int $circleId, int $userId): array
    {
        Circle::findOrFail($circleId);
        $user = User::findOrFail($userId);
        $user->circleUsers()->delete();
        $user->delete();

        return [
            'status' => true
        ];
    }
}
