<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CircleUser;

use App\Models\User;
use App\Support\Arr;
use App\Usecases\Admin\Circle\IndexCircleByUserIdUsecase;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

final class IndexCircleUserByUserIdController
{
    private IndexCircleByUserIdUsecase $indexCircleByUserIdUserUsecase;

    public function __construct(IndexCircleByUserIdUsecase $indexCircleByUserIdUserUsecase)
    {
        $this->indexCircleByUserIdUserUsecase = $indexCircleByUserIdUserUsecase;
    }

    public function __invoke(Request $request, int $userId): array
    {
        Log::debug("IndexCircleUserByUserIdController args userId=$userId");

        $user = User::findOrFail($userId);
        $circles = $this->indexCircleByUserIdUserUsecase->invoke($userId);

        return [
            'user'    => Arr::camel_keys($user->toArray()),
            'circles' => Arr::camel_keys(
                (new Collection($circles))->map(
                    fn (CircleValueObject $circleValueObject) => $circleValueObject->toArray()
                )->toArray()
            ),
        ];
    }
}
