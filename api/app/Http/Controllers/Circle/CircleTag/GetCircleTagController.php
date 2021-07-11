<?php

declare(strict_types=1);

namespace App\Http\Controllers\Circle\CircleTag;

use App\Entity\CircleTagEntity;
use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Models\Circle;
use App\Models\CircleInformation;
use App\Models\CircleTag;
use App\Support\Arr;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class GetCircleTagController extends Controller
{
    use Permission;

    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param int     $circleId
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     *
     * @return array[]
     */
    public function __invoke(Request $request, int $circleId)
    {
        Log::debug("CreateOrUpdateCircleTagController args circleId=$circleId");

        /** @var \App\Models\User */
        $user = $request->user();
        $this->permissionCircle($user, $circleId);

        $circle = Circle::findOrFail($circleId);
        $circleInformation = CircleInformation::whereCircleId($circleId)->first();
        $circleTag = CircleTag::whereCircleId($circleId)->first();

        return [
            'circle' => Arr::camel_keys(
                CircleValueObject::byEloquent(
                    $circle,
                    $circle->circleInformation,
                    null
                )->toArray()
            ),

            'circleTag' => $circleInformation && $circleTag
                ? CircleTagEntity::byEloquent($circleInformation, $circleTag)->toArray()
                : [],
        ];
    }
}
