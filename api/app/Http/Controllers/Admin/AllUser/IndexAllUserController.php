<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\AllUser;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\UseCases\AdminManagement\AllUser\IndexAllUserUsecase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class IndexAllUserController extends Controller
{
    private IndexAllUserUsecase $indexAllUserUsecase;

    public function __construct(IndexAllUserUsecase $indexAllUserUsecase)
    {
        $this->indexAllUserUsecase = $indexAllUserUsecase;
    }

    public function __invoke(Request $request): array
    {
        Log::debug('IndexAllUserController args none');

        $user = $this->indexAllUserUsecase->invoke();

        return Arr::camel_keys([
            'data' => $user->toArray(),
        ]);
    }
}
