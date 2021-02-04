<?php

namespace App\Http\Controllers\Admin\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Models\CircleNewJoy;
use Illuminate\Http\Request;

class CopyCircleNewJoyController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param int $circleId
     * @param int $circleNewJoyId
     * @return array
     */
    public function __invoke(Request $request, int $circleId, int $circleNewJoyId): array
    {
        CircleNewJoy::whereCircleId($circleId)
            ->findOrFail($circleNewJoyId)
            ->replicate()
            ->save();

        return [
            'success' => true
        ];
    }
}
