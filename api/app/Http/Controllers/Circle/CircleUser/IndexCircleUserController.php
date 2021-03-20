<?php

namespace App\Http\Controllers\Circle\CircleUser;

use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Models\Circle;
use App\Models\User;
use App\Support\Arr;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class IndexCircleUserController extends Controller
{
    use Permission;

    public function __invoke(Request $request, int $circleId)
    {
        Log::debug("IndexCircleUserController args circleId=$circleId");

        /** @var \App\Models\User */
        $user = $request->user();
        $this->permissionCircle($user, $circleId);

        $circle = Circle::whereRelease(true)->findOrFail($circleId);
        $circleUsers = User::whereActive(true)
            ->hasByNonDependentSubquery('circleUsers', function ($query) use ($circleId) {
                /** @var \App\Models\CircleUser $query */
                $query->whereCircleId($circleId);
            })->get();

        return Arr::camel_keys([
            'circle' => Arr::camel_keys(
                CircleValueObject::byEloquent(
                    $circle,
                    $circle->circleInformation,
                    null
                )->toArray()
            ),

            'data' => $circleUsers->toArray(),
        ]);
    }
}
