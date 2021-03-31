<?php

namespace App\Dto;

use App\ValueObjects\CircleUserDetailValueObject;
use Illuminate\Support\Collection;

/**
 * メールアドレスの認証が済んでいるかどうかでユーザーを分ける
 */
class SeparateIsEmailVerifyCircleUserDto
{
    /**
     * メールアドレスの認証が済んでいる
     *
     * @var \App\ValueObjects\CircleUserDetailValueObject[]
     */
    public array $done;

    /**
     * メールアドレスの認証が済んでいない
     *
     * @var \App\ValueObjects\CircleUserDetailValueObject[]
     */
    public array $notDone;

    /**
     * メールアドレスの認証が済んでいるユーザー一覧
     *
     * @var array
     */
    public function toArrayDone(): array
    {
        return (new Collection($this->done))->map(
            fn (CircleUserDetailValueObject $v) => $v->toArray()
        )->values()->toArray();
    }

    /**
     * メールアドレスの認証が済んでいないユーザー一覧
     *
     * @var array
     */
    public function toArrayNotDone(): array
    {
        return (new Collection($this->notDone))->map(
            fn (CircleUserDetailValueObject $v) => $v->toArray()
        )->values()->toArray();
    }
}
