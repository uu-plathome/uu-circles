<?php

namespace App\Http\Controllers\Circle\CircleTag;

use App\Entity\CircleTagEntity;
use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Models\CircleInformation;
use App\Models\CircleTag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GetCircleTagController extends Controller
{
    use Permission;

    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param int $circleId
     * @return array[]
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function __invoke(Request $request, int $circleId)
    {
        Log::debug("CreateOrUpdateCircleTagController args circleId=$circleId");

        /** @var \App\Models\User */
        $user = $request->user();
        $this->permissionCircle($user, $circleId);

        $circleInformation = CircleInformation::whereCircleId($circleId)->first();
        $circleTag = CircleTag::whereCircleId($circleId)->first();

        return [
            'circleTag' => $circleInformation && $circleTag
                ? CircleTagEntity::byEloquent($circleInformation, $circleTag)->toArray()
                : [],
        ];
    }
}
