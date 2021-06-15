<?php

declare(strict_types=1);

namespace App\Usecases\CircleManagement\CircleNewJoy\Dto;

use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Support\Collection;

/**
 * 公開中、非公開で新歓一覧を作る.
 */
final class SeparateReleaseCircleNewJoyDto
{
    /**
     * 過去の公開中の新歓一覧.
     *
     * @var \App\ValueObjects\CircleNewJoyValueObjects[]
     */
    public array $on_release_past;

    /**
     * 未来の公開中の新歓一覧.
     *
     * @var \App\ValueObjects\CircleNewJoyValueObjects[]
     */
    public array $on_release_future;

    /**
     * 過去の非公開の新歓一覧.
     *
     * @var \App\ValueObjects\CircleNewJoyValueObjects[]
     */
    public array $on_private_past;

    /**
     * 未来の非公開の新歓一覧.
     *
     * @var \App\ValueObjects\CircleNewJoyValueObjects[]
     */
    public array $on_private_future;

    /**
     * 過去の公開中の新歓一覧.
     *
     * @var array
     */
    public function toArrayOnReleasePast(): array
    {
        return (new Collection($this->on_release_past))->map(
            fn (CircleNewJoyValueObject $v) => $v->toArray()
        )->values()->toArray();
    }

    /**
     * 未来の公開中の新歓一覧.
     *
     * @var array
     */
    public function toArrayOnReleaseFuture(): array
    {
        return (new Collection($this->on_release_future))->map(
            fn (CircleNewJoyValueObject $v) => $v->toArray()
        )->values()->toArray();
    }

    /**
     * 過去の非公開の新歓一覧.
     *
     * @var array
     */
    public function toArrayOnPrivatePast(): array
    {
        return (new Collection($this->on_private_past))->map(
            fn (CircleNewJoyValueObject $v) => $v->toArray()
        )->values()->toArray();
    }

    /**
     * 未来の非公開の新歓一覧.
     *
     * @var array
     */
    public function toArrayOnPrivateFuture(): array
    {
        return (new Collection($this->on_private_future))->map(
            fn (CircleNewJoyValueObject $v) => $v->toArray()
        )->values()->toArray();
    }
}
