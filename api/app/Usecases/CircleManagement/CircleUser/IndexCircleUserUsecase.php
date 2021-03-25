<?php

namespace App\Usecases\CircleManagement\CircleUser;

use App\Dto\SeparateIsEmailVerifyCircleUserDto;
use App\Enum\Property\UserProperty;
use App\Models\User;
use App\ValueObjects\CircleUserDetailValueObject;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class IndexCircleUserUsecase
{
    /**
     * サークルに紐づく部員アカウント一覧を取得
     *
     * @param integer $circleId
     * @return SeparateIsEmailVerifyCircleUserDto
     */
    public function invoke(int $circleId): SeparateIsEmailVerifyCircleUserDto
    {
        Log::debug("IndexCircleUserUsecase args", [
            'circleId' => $circleId,
        ]);

        $circleUsers = User::with([
            'circleUsers' => function ($query) use ($circleId) {
                /** @var \App\Models\CircleUser $query */
                $query->whereCircleId($circleId);
            }
        ])
            ->whereActive(true)
            ->hasByNonDependentSubquery('circleUsers', function ($query) use ($circleId) {
                /** @var \App\Models\CircleUser $query */
                $query->whereCircleId($circleId);
            })
            ->select([
                UserProperty::display_name,
                UserProperty::email,
                UserProperty::email_verified_at,
                UserProperty::id,
                UserProperty::username,
            ])
            ->get();

        $circleUsersValueObjects = (new Collection($circleUsers))->map(
            fn (User $user) => CircleUserDetailValueObject::byEloquent($user, $circleId)
        );

        // 認証済みのユーザー一覧
        $emailVerifyDone = $circleUsersValueObjects->filter(
            fn (CircleUserDetailValueObject $circleUser) => $circleUser->email_verified_at
        )->toArray();

        // 未認証のユーザー一覧
        $emailVerifyNotDone = $circleUsersValueObjects->filter(
            fn (CircleUserDetailValueObject $circleUser) => !$circleUser->email_verified_at
        )->toArray();

        $dto = new SeparateIsEmailVerifyCircleUserDto();
        $dto->done = $emailVerifyDone;
        $dto->notDone = $emailVerifyNotDone;

        return $dto;
    }
}
