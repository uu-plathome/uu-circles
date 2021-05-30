<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Circle;

use App\Enum\Role;
use App\Enum\SlackChannel;
use App\Facade\Slack;
use App\Http\Controllers\Controller;
use App\Models\Circle;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class DeleteCircleController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param int $circleId
     * @return array
     * @throws Exception
     */
    public function __invoke(Request $request, int $circleId)
    {
        Log::debug("DeleteCircleController args", [
            'circleId' => $circleId,
        ]);

        $role = Auth::user()->adminUser->role;
        if ($role !== Role::SYSTEM) {
            return abort(403);
        }

        $circle = Circle::with([
            'circleUsers',
            'circleHandbill',
            'circleNewJoys',
            'circleTag',
            'circleInvitation',
            'circleInformation',
        ])->findOrFail($circleId);
        $circleUsers = $circle->circleUsers();
        $circleHandbill = $circle->circleHandbill();
        $circleNewJoys = $circle->circleNewJoys();
        $circleTag = $circle->circleTag();
        $circleInvitation = $circle->circleInvitation();
        $circleInformation = $circle->circleInformation();
        Log::info("DeleteCircleData", [
            'circle'            => $circle,
        ]);

        Slack::channel(SlackChannel::delete)->send(
            json_encode([
                'title'             => $circle->name . 'を削除します。',
                'circle'            => $circle,
            ])
        );

        DB::beginTransaction();
        try {
            $circleUsers->delete();
            $circleHandbill->delete();
            $circleNewJoys->delete();
            $circleTag->delete();
            $circleInvitation->delete();
            $circleInformation->delete();
            $circle->delete();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error("DeleteCircleController [ERROR]", [
                'circleId' => $circleId,
            ]);
            throw $e;
        }

        return [
            'data' => 'Success',
        ];
    }
}
