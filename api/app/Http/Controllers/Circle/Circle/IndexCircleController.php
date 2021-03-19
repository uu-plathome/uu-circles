<?php

namespace App\Http\Controllers\Circle\Circle;

use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Models\Circle;
use App\Models\CircleUser;
use App\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class IndexCircleController extends Controller
{
    use Permission;

    public function __invoke(Request $request)
    {
        Log::debug('IndexCircleController args none');

        /** @var \App\Models\User */
        $user = $request->user();
        $this->permissionWithGetUser($user);

        $circleIds = $user->circleUsers->map(
            fn (CircleUser $circleUser) => $circleUser->circle_id
        )->all();
        $circles = Circle::whereIn('id', $circleIds)->get();

        Log::debug('IndexCircleController', [
            'circles'   => $circles,
            'circleIds' => $circleIds,
        ]);

        return Arr::camel_keys([
            'data' => [
                Arr::except($circles->toArray(), ['is_main_fixed'])
            ],
        ]);
    }
}
