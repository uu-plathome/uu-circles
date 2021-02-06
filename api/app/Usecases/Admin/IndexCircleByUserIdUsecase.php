<?php


namespace App\Usecases\Admin;


use App\ValueObjects\CircleValueObject;

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
        ])->whereHas('circleInformation')
            ->whereHas('circleUsers', function ($query) use ($userId) {
                $query->whereUserId($userId);
            })
            ->get();

        return $circles->map(fn (Circle $circle) =>
            CircleValueObject::byEloquent(
                $circle,
                $circle->circleInformation
            )
        )->all();
    }
}
