<?php

declare(strict_types=1);

namespace App\Http\Controllers\Circle\CircleNewJoy;

use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Models\Circle;
use App\Models\CircleNewJoy;
use App\Support\Arr;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class ShowCircleNewJoyController extends Controller
{
    use Permission;

    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param int     $circleId
     * @param int     $circleNewJoyId
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     *
     * @return array
     */
    public function __invoke(Request $request, int $circleId, int $circleNewJoyId): array
    {
        Log::debug('ShowCircleNewJoyController args', [
            'circleId'       => $circleId,
            'circleNewJoyId' => $circleNewJoyId,
        ]);

        /** @var \App\Models\User */
        $user = $request->user();
        $this->permissionCircle($user, $circleId);

        $circle = Circle::whereRelease(true)->findOrFail($circleId);
        $circleNewJoy = CircleNewJoy::whereCircleId($circleId)->findOrFail($circleNewJoyId);

        return [
            'circle' => Arr::camel_keys(CircleValueObject::byEloquent(
                $circle,
                $circle->circleInformation,
                null
            )->toArray()),

            'circleNewJoy' => Arr::camel_keys($circleNewJoy->toArray()),
        ];
    }
}
