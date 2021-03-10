<?php

namespace App\Http\Controllers\Circle\Circle;

use App\Http\Controllers\Controller;
use App\Http\Requests\Circle\Traits\Permission;
use App\Models\Circle;
use App\Support\Arr;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;

class ShowCircleController extends Controller
{
    use Permission;

    public function __invoke(Request $request, int $circleId)
    {
        /** @var \App\Models\User */
        $user = $request->user();
        $this->permissionWithGetUser($user);

        /** @var Circle $circle */
        $circle = Circle::with(['circleInformation', 'circleHandbill'])
            ->whereRelease(true)
            ->hasByNonDependentSubquery('circleUser', function ($query) use ($user) {
                /** @var \App\Models\CircleUser $query */
                $query->whereUserId($user->id);
            })
            ->findOrFail($circleId);

        return [
            'data' => Arr::camel_keys(CircleValueObject::byEloquent(
                $circle,
                $circle->circleInformation,
                $circle->circleHandbill ?? null
            )->toArray()),
        ];
    }
}
