<?php

declare(strict_types=1);

namespace App\Http\Controllers\Circle\CircleUser;

use App\Enum\Property\UserProperty;
use App\Enum\Role;
use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class SearchCircleUserController extends Controller
{
    use Permission;

    /**
     * @param Request $request
     * @param int     $circleId
     * @param string  $searchText
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     *
     * @return array
     */
    public function __invoke(
        Request $request,
        int $circleId,
        string $searchText
    ) {
        Log::debug('SearchCircleUserController args', [
            'circleId'   => $circleId,
            'searchText' => $searchText,
        ]);

        /** @var \App\Models\User $authUser */
        $authUser = $request->user();
        $this->permissionCircle($authUser, $circleId, [Role::MANAGER]);

        $foundResultUsers = User::with(['circleUsers', 'adminUser'])
            ->whereActive(true)
            ->whereNotNull(UserProperty::email_verified_at)
            ->where(function ($query) use ($searchText) {
                $query->where(UserProperty::email, 'like', "%$searchText%")
                    ->orWhere(UserProperty::display_name, 'like', "%$searchText%")
                    ->orWhere(UserProperty::username, 'like', "%$searchText%");
            })
            ->get();

        $resultUsers = $foundResultUsers->filter(function ($user) use ($circleId) {
            // 管理者は検索結果に出さない
            if (!is_null($user->adminUser)) {
                return false;
            }

            // サークルに無所属のユーザーは検索結果に出す
            if (is_null($user->circleUsers)) {
                return true;
            }

            // サークルに所属していないユーザーは検索結果に出す
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
