<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CircleNewJoy\RegisterCircleNewJoyRequest;
use App\Usecases\Admin\CreateCircleNewJoyUsecase;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

final class RegisterCircleNewJoyController extends Controller
{
    private CreateCircleNewJoyUsecase $createCircleNewJoyUsecase;

    public function __construct(CreateCircleNewJoyUsecase $createCircleNewJoyUsecase)
    {
        $this->createCircleNewJoyUsecase = $createCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param RegisterCircleNewJoyRequest $request
     * @param int $circleId
     * @return Response
     * @throws Exception
     */
    public function __invoke(RegisterCircleNewJoyRequest $request, int $circleId)
    {
        $circleNewJoyValueObject = $request->makeCircleNewJoyValueObject();
        $this->createCircleNewJoyUsecase->invoke($circleId, $circleNewJoyValueObject);
    }
}
