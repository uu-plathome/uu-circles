<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class LogoutAdminController extends Controller
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
        Log::debug("LogoutAdminController args none");

        $user = Auth::user();

        DB::beginTransaction();
        try {
            $user->createApiToken();
            $user->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            Log::error("LogoutAdminController [ERROR]", [
                'user' => $user
            ]);

            throw $e;
        }
    }
}
