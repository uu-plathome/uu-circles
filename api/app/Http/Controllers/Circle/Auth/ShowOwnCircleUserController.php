<?php

declare(strict_types=1);

namespace App\Http\Controllers\Circle\Auth;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class ShowOwnCircleUserController extends Controller
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
    public function __invoke(Request $request)
    {
        Log::debug('ShowOwnCircleUserController args none');

        /** @var \App\Models\User $user */
        $user = $request->user();
        if (!$user->circleUsers) {
            Log::info("[INFO] ShowOwnCircleUserController code=400, userId=$user->id");

            throw new AuthorizationException();
        }

        return Arr::camel_keys($request->user()->toArray());
    }
}
