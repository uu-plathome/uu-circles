<?php

declare(strict_types=1);

namespace App\Usecases\Admin\Circle;

use App\Models\Circle;
use App\ValueObjects\CircleValueObject;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;

final class IndexCircleByUserIdUsecase
{
    /**
     * UserIdに紐づくサークルを全て取得する.
     *
     * @param int $userId
     *
     * @return CircleValueObject[]
     */
    public function invoke(int $userId): array
    {
        Log::debug("IndexCircleByUserIdUsecase args userId=$userId");

        $circles = Circle::with([
            'circleInformation',
            'circleUsers',
            'circleHandbill',
        ])->hasByNonDependentSubquery('circleInformation')
            ->hasByNonDependentSubquery('circleUsers', function (Builder $query) use ($userId) {
                $query->whereUserId($userId);
            })
            ->get();

        return $circles->map(
            fn (Circle $circle) => CircleValueObject::byEloquent(
                $circle,
                $circle->circleInformation,
                $circle->circleHandbill
            )
        )->all();
    }
}
