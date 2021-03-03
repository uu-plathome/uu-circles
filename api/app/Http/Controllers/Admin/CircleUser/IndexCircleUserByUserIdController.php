<?php

namespace App\Http\Controllers\Admin\CircleUser;

use App\Models\User;
use App\Usecases\Admin\IndexCircleByUserIdUsecase;
use App\Support\Arr;
use Illuminate\Http\Request;

class IndexCircleUserByUserIdController
{
    private IndexCircleByUserIdUsecase $indexCircleByUserIdUserUsecase;

    public function __construct(IndexCircleByUserIdUsecase $indexCircleByUserIdUserUsecase)
    {
        $this->indexCircleByUserIdUserUsecase = $indexCircleByUserIdUserUsecase;
    }

    public function __invoke(Request $request, int $userId): array
    {
        $user = User::findOrFail($userId);
        $circles = $this->indexCircleByUserIdUserUsecase->invoke($userId);

        return [
            'user'    => Arr::camel_keys($user->toArray()),
            'circles' => Arr::camel_keys($circles),
        ];
    }
}
