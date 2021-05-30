<?php

declare(strict_types=1);

namespace App\Http\Controllers\Circle\Circle;

use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Models\Circle;
use App\Models\CircleUser;
use App\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

final class IndexCircleController extends Controller
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
        $circles = Circle::whereRelease(true)
            ->whereIn('id', $circleIds)
            ->get();

        if ($circles->count() === 0) {
            throw new NotFoundHttpException();
        }

        Log::debug('IndexCircleController', [
            'circles'   => $circles,
            'circleIds' => $circleIds,
        ]);

        return Arr::camel_keys([
            'data' => $circles->toArray(),
        ]);
    }
}
