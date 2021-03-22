<?php

namespace App\Http\Controllers\Admin\CircleTag;

use App\Entity\CircleTagEntity;
use App\Http\Controllers\Controller;
use App\Models\CircleInformation;
use App\Models\CircleTag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GetCircleTagController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, int $circleId)
    {
        Log::debug("CreateOrUpdateCircleTagController args circleId=$circleId");

        $circleInformation = CircleInformation::whereCircleId($circleId)->first();
        $circleTag = CircleTag::whereCircleId($circleId)->first();

        return [
            'circleTag' => $circleInformation && $circleTag
                ? CircleTagEntity::byEloquent($circleInformation, $circleTag)->toArray()
                : [],
        ];
    }
}
