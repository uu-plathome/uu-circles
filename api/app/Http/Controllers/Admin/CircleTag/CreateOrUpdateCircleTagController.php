<?php

namespace App\Http\Controllers\Admin\CircleTag;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CircleTag\CreateOrUpdateCircleTagRequest;
use App\Usecases\Admin\CircleTag\CreateOrUpdateCircleTagUsecase;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class CreateOrUpdateCircleTagController extends Controller
{
    private CreateOrUpdateCircleTagUsecase $createOrUpdateCircleTagUsecase;

    public function __construct(CreateOrUpdateCircleTagUsecase $createOrUpdateCircleTagUsecase)
    {
        $this->createOrUpdateCircleTagUsecase = $createOrUpdateCircleTagUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param CreateOrUpdateCircleTagRequest $request
     * @param int $circleId
     * @return Response|string[]
     * @throws Exception
     */
    public function __invoke(
        CreateOrUpdateCircleTagRequest $request,
        int $circleId
    ) {
        Log::debug("CreateOrUpdateCircleTagController args circleId=$circleId");

        $this->createOrUpdateCircleTagUsecase->invoke(
            $request->makeCreateOrUpdateCircleTagUsecaseParam()
        );

        return [
            'data' => 'success',
        ];
    }
}
