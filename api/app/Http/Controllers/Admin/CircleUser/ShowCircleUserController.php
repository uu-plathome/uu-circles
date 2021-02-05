<?php

namespace App\Http\Controllers\Admin\CircleUser;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Support\Arr;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ShowCircleUserController extends Controller
{
    public function __invoke(Request $request, int $circleId, int $userId)
    {
        $user = User::findOrFail($userId);
        if (!$user->isCircleUser()) {
            throw new ModelNotFoundException();
        }

        return [
            'data' => Arr::camel_keys($user->toArray()),
        ];
    }
}
