<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CircleUser;

use App\Http\Controllers\Controller;
use App\Models\Circle;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

final class DeleteCircleUserController extends Controller
{
    public function __invoke(Request $request, int $circleId, int $userId): array
    {
        Circle::findOrFail($circleId);
        $user = User::findOrFail($userId);

        DB::beginTransaction();
        try {
            // サークル管理者の削除
            $user->circleUsers()->delete();

            // 管理者ではないとき
            if (!$user->isAdminUser()) {
                $user->delete();
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }

        return [
            'status' => true,
        ];
    }
}
