<?php

namespace App\Http\Controllers\Circle\CircleUser;

use App\Enum\Property\CircleUserProperty;
use App\Enum\Property\UserProperty;
use App\Enum\Role;
use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Support\Arr;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SearchCircleUserController extends Controller
{
    use Permission;

    /**
     * @param Request $request
     * @param int $circleId
     * @throws Exception
     */
    public function __invoke(
        Request $request,
        int $circleId,
        string $searchText
    ) {
        Log::debug("SearchCircleUserController args", [
            'circleId'   => $circleId,
            'searchText' => $searchText
        ]);

        /** @var \App\Models\User $authUser */
        $authUser = $request->user();
        $this->permissionCircle($authUser, $circleId, [Role::MANAGER]);

        $foundResultUsers = User::with('circleUsers')
            ->whereActive(true)
            ->where(function ($query) use ($searchText) {
                $query->where(UserProperty::email, 'like', "%$searchText%")
                    ->orWhere(UserProperty::display_name, 'like', "%$searchText%")
                    ->orWhere(UserProperty::username, 'like', "%$searchText%");
            })
            ->hasByNonDependentSubquery('circleUsers', function ($query) use ($circleId) {
                /** @var \App\Models\CircleUser $query */
                $query->where(CircleUserProperty::circle_id, '!=', $circleId);
            })
            ->get();

        $resultUsers = $foundResultUsers->filter(function ($user) use ($circleId) {
            $ids = $user->circleUsers->map(
                fn ($circleUser) => $circleUser->circle_id
            )->toArray();

            return !in_array($circleId, $ids, true);
        })->values();

        return [
            'data' => Arr::camel_keys($resultUsers->toArray()),
        ];
    }
}
