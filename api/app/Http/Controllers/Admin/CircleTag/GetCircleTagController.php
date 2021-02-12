<?php

namespace App\Http\Controllers\Admin\CircleTag;

use App\Entity\CircleTagEntitiy;
use App\Http\Controllers\Controller;
use App\Models\CircleInformation;
use App\Models\CircleTag;
use Illuminate\Http\Request;

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
        $circleInformation = CircleInformation::whereCircleId($circleId)->first();
        $circleTag = CircleTag::whereCircleId($circleId)->first();

        return [
            'circleTag' => $circleInformation && $circleTag
                ? CircleTagEntitiy::byEloquent($circleInformation, $circleTag)->toArray()
                : [],
        ];
    }
}
