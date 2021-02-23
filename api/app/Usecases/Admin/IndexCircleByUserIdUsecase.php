<?php


namespace App\Usecases\Admin;


use App\Models\Circle;
use App\ValueObjects\CircleValueObject;
use Illuminate\Database\Eloquent\Builder;

class IndexCircleByUserIdUsecase
{
    /**
     * UserIdに紐づくサークルを全て取得する
     *
     * @param int $userId
     * @return CircleValueObject[]
     */
    public function invoke(int $userId): array
    {
        $circles = Circle::with([
            'circleInformation',
            'circleUsers',
        ])->hasByNonDependentSubquery('circleInformation')
            ->hasByNonDependentSubquery('circleUsers', function (Builder $query) use ($userId) {
                $query->whereUserId($userId);
            })
            ->get();

        return $circles->map(
            fn (Circle $circle) =>
            CircleValueObject::byEloquent(
                $circle,
                $circle->circleInformation,
                null
            )
        )->all();
    }
}
