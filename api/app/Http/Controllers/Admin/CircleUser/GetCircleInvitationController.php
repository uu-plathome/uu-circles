<?php

namespace App\Http\Controllers\Admin\CircleUser;

use App\Http\Controllers\Controller;
use App\Usecases\Admin\CreateCircleInvitationUsecase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GetCircleInvitationController extends Controller
{
    private CreateCircleInvitationUsecase $createCircleInvitationUsecase;

    public function __construct(CreateCircleInvitationUsecase $createCircleInvitationUsecase)
    {
        $this->createCircleInvitationUsecase = $createCircleInvitationUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $circleId
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function __invoke(Request $request, int $circleId)
    {
        $this->createCircleInvitationUsecase->invoke($circleId, Auth::id());
    }
}
