<?php

declare(strict_types=1);

namespace App\Http\Controllers\Circle\User;

use App\Enum\Property\UserProperty;
use App\Http\Controllers\Controller;
use App\Http\Requests\Circle\User\UpdateOwnUserRequest;
use App\Support\Arr;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

final class UpdateOwnUserController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @throws AuthorizationException
     *
     * @return array
     */
    public function __invoke(UpdateOwnUserRequest $request)
    {
        Log::debug('UpdateOwnUserController args none');

        /** @var \App\Models\User $user */
        $user = $request->user();
        if (!$user->circleUsers) {
            Log::info("[INFO] UpdateOwnUserController code=400, userId=$user->id");

            throw new AuthorizationException();
        }

        $request->validate([
            UserProperty::username => 'unique:users,username,'.$user->id,
        ]);

        $makeUpdateInput = [
            UserProperty::display_name => $request->get(Str::camel(UserProperty::display_name)),
            UserProperty::username     => $request->get(Str::camel(UserProperty::username)),
        ];

        DB::beginTransaction();

        try {
            $user->update($makeUpdateInput);
            DB::commit();
        } catch (Exception $e) {
            Log::error('[ERROR] UpdateOwnUserController', [
                'value' => $request->all(),
            ]);
            DB::rollBack();

            throw $e;
        }

        return [
            'data' => Arr::camel_keys($user->toArray()),
        ];
    }
}
