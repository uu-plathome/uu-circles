<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\ValueObjects\AdminUserValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

final class ShowOwnAdminUserController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function __invoke(Request $request)
    {
        Log::debug('ShowOwnAdminUserController args none');

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $adminUser = Auth::adminUser();

        if (!$adminUser) {
            Log::info("[INFO] ShowOwnAdminUserController code=400, userId=$user->id");

            return abort(400);
        }

        return Arr::camel_keys(
            AdminUserValueObject::byEloquent(
                $user,
                $adminUser
            )->toArray(true)
        );
    }
}
