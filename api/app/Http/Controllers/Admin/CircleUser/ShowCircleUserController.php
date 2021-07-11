<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CircleUser;

use App\Http\Controllers\Controller;
use App\Models\CircleUser;
use App\Models\User;
use App\Support\Arr;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

final class ShowCircleUserController extends Controller
{
    public function __invoke(Request $request, int $circleId, int $userId)
    {
        $user = User::findOrFail($userId);
        if (!$user->isCircleUser()) {
            throw new ModelNotFoundException();
        }
        $circleUser = CircleUser::whereUserId($userId)
            ->whereCircleId($circleId)
            ->firstOrFail();

        return [
            'data' => Arr::camel_keys(array_merge(
                $user->toArray(),
                ['role' => $circleUser->role]
            )),
        ];
    }
}
