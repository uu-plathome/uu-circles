<?php

declare(strict_types=1);

namespace App\Http\Controllers\Circle\Auth;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class LogoutCircleController extends Controller
{
    /**
     * ログアウト処理をする
     *
     * @param Request $request
     * @return void
     * @throws Exception
     */
    public function __invoke(Request $request)
    {
        Log::debug("LogoutCircleController args none");

        $user = Auth::user();

        DB::beginTransaction();
        try {
            $user->createApiToken();
            $user->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            Log::error("LogoutCircleController [ERROR]", [
                'user' => $user
            ]);

            throw $e;
        }
    }
}
