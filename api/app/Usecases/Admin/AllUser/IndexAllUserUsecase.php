<?php

namespace App\Usecases\Admin\AllUser;

use App\Enum\Property\UserProperty;
use App\Models\User;
use App\Support\Arr;
use App\Usecases\Admin\AllUser\Params\IndexAllUserUsecaseParam;
use App\ValueObjects\CircleUserValueObject;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class IndexAllUserUsecase
{
    /**
     * 管理者ではないアカウント一覧
     *
     * @return array
     */
    public function invoke(IndexAllUserUsecaseParam $param): array
    {
        Log::debug("IndexAllUserUsecase args", [
            'IndexAllUserUsecaseParam' => $param,
        ]);

        $cursor = [];
        if ($param->id) {
            $cursor['id'] = $param->id;
        }
        if ($param->updated_at) {
            $cursor['updated_at'] = $param->updated_at;
        }

        $allUser = User::whereDoesntHave('adminUser')
            ->when($param->search, function (Builder $query) use ($param) {
                $query->where(UserProperty::email, 'like', "%{$param->search}%")
                    ->orWhere(UserProperty::display_name, 'like', "%{$param->search}%")
                    ->orWhere(UserProperty::username, 'like', "%{$param->search}%");
            })
            ->lampager()
            ->forward(!!$param->next)
            ->backward(!!$param->previous)
            ->limit(10)
            ->orderByDesc('updated_at')
            ->orderByDesc('id')
            ->seekable()
            ->paginate($cursor)
            ->toArray(JSON_PRETTY_PRINT);

        $newAllUser = (new Collection($allUser['records']))->map(
            fn (User $user) =>
            CircleUserValueObject::byEloquent($user)->toArray()
        )->all();

        Arr::set($allUser, 'records', $newAllUser);

        return $allUser;
    }
}
