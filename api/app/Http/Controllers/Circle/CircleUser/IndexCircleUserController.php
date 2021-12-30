<?php

declare(strict_types=1);

namespace App\Http\Controllers\Circle\CircleUser;

use App\Enum\Role;
use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Models\Circle;
use App\Support\Arr;
use App\UseCases\CircleManagement\CircleUser\IndexCircleUserUsecase;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class IndexCircleUserController extends Controller
{
    use Permission;

    private IndexCircleUserUsecase $indexCircleUserUsecase;

    public function __construct(IndexCircleUserUsecase $indexCircleUserUsecase)
    {
        $this->indexCircleUserUsecase = $indexCircleUserUsecase;
    }

    public function __invoke(Request $request, int $circleId)
    {
        Log::debug("IndexCircleUserController args circleId=$circleId");

        /** @var \App\Models\User */
        $user = $request->user();
        $this->permissionCircle($user, $circleId, [Role::MANAGER]);

        $circle = Circle::whereRelease(true)->findOrFail($circleId);
        $circleUsers = $this->indexCircleUserUsecase->invoke($circleId);

        return Arr::camel_keys([
            'circle' => Arr::camel_keys(
                CircleValueObject::byEloquent(
                    $circle,
                    $circle->circleInformation,
                    null
                )->toArray()
            ),

            'circleUsersDoneEmailVerify'    => $circleUsers->toArrayDone(),
            'circleUsersNotDoneEmailVerify' => $circleUsers->toArrayNotDone(),
        ]);
    }
}
