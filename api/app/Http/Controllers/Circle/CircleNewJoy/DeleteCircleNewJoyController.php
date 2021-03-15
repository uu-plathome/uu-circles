<?php

namespace App\Http\Controllers\Admin\CircleNewJoy;

use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Usecases\Admin\DeleteCircleNewJoyUsecase;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DeleteCircleNewJoyController extends Controller
{
    use Permission;

    private DeleteCircleNewJoyUsecase $deleteCircleNewJoyUsecase;

    public function __construct(DeleteCircleNewJoyUsecase $deleteCircleNewJoyUsecase)
    {
        $this->deleteCircleNewJoyUsecase = $deleteCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param int $circleId
     * @param int $circleNewJoyId
     * @return bool[]
     * @throws Exception
     */
    public function __invoke(Request $request, int $circleId, int $circleNewJoyId): array
    {
        Log::debug("DeleteCircleNewJoyController args", [
            'circleId'       => $circleId,
            'circleNewJoyId' => $circleNewJoyId,
        ]);

        /** @var \App\Models\User */
        $user = $request->user();
        $this->permissionCircle($user, $circleId);

        $this->deleteCircleNewJoyUsecase->invoke($circleId, $circleNewJoyId);

        return [
            'success' => true
        ];
    }
}
