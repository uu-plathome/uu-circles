<?php

namespace App\Http\Controllers\Admin\AllUser;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Admin\AllUser\IndexAllUserUsecase;
use App\Usecases\Admin\AllUser\Params\IndexAllUserUsecaseParam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class IndexAllUserController extends Controller
{
    private IndexAllUserUsecase $indexAllUserUsecase;

    public function __construct(IndexAllUserUsecase $indexAllUserUsecase)
    {
        $this->indexAllUserUsecase = $indexAllUserUsecase;
    }

    public function __invoke(Request $request): array
    {
        Log::debug("IndexAllUserController args none");

        $request->validate(Arr::camel_keys([
            'id'         => 'nullable|integer',
            'updated_at' => 'nullable|string',
            'previous'   => 'nullable|boolean',
            'next'       => 'nullable|boolean',
            'search'       => 'nullable|string',
        ]));
        $requestId = $request->query('id', null);
        $requestUpdatedAt = $request->query(Str::camel('updated_at'), null);
        $requestPrevious = $request->query('previous', false);
        $requestNext = $request->query('next', false);
        $requestSearch = $request->query('search', null);
        $param = new IndexAllUserUsecaseParam();
        $param->id = $requestId;
        $param->updated_at = $requestUpdatedAt;
        $param->previous = $requestPrevious;
        $param->next = $requestNext;
        $param->search = $requestSearch;
        if ($param->previous === $param->next) {
            $param->previous = !$param->previous;
        }
        $user = $this->indexAllUserUsecase->invoke($param);

        return Arr::camel_keys([
            'data' => $user,
        ]);
    }
}
