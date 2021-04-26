<?php

namespace App\Http\Controllers\Circle\CircleTag;

use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Http\Requests\Circle\CircleTag\CreateOrUpdateCircleTagRequest;
use App\Usecases\CircleManagement\CircleTag\CreateOrUpdateCircleTagUsecase;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class CreateOrUpdateCircleTagController extends Controller
{
    use Permission;

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

        /** @var \App\Models\User */
        $user = $request->user();
        $this->permissionCircle($user, $circleId);

        $this->createOrUpdateCircleTagUsecase->invoke(
            $request->makeCreateOrUpdateCircleTagUsecaseParam()
        );

        return [
            'data' => 'success',
        ];
    }
}
