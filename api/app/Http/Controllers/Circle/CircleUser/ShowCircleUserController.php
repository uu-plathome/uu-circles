<?php

namespace App\Http\Controllers\Circle\CircleUser;

use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ShowCircleUserController extends Controller
{
    use Permission;

    public function __invoke(Request $request, int $circleId, int $userId)
    {
        Log::debug("ShowCircleUserController args", [
            'circleId' => $circleId,
            'userId'   => $userId,
        ]);

        /** @var \App\Models\User $authUser */
        $authUser = $request->user();
        $this->permissionCircle($authUser, $circleId);

        /** @var \App\Models\User $user */
        $user = User::whereActive(true)->findOrFail($userId);
        $this->permissionCircle($user, $circleId);

        return [
            'data' => Arr::camel_keys($user->toArray()),
        ];
    }
}
