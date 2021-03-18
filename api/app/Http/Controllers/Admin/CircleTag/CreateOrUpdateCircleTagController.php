<?php

namespace App\Http\Controllers\Admin\CircleTag;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CircleTag\CreateOrUpdateCircleTagRequest;
use App\Usecases\Admin\CreateOrUpdateCircleTagUsecase;
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(
        CreateOrUpdateCircleTagRequest $request,
        int $circleId
    ) {
        Log::debug("CreateOrUpdateCircleTagController args circleId=$circleId");

        $this->createOrUpdateCircleTagUsecase->invoke(
            $circleId,
            $request->makeCircleTagEntitiy()
        );

        return [
            'data' => 'success',
        ];
    }
}
