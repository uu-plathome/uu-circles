<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\CircleUser;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\UseCases\AdminManagement\CircleUser\IndexCircleUserUsecase;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

final class IndexCircleUserController extends Controller
{
    private IndexCircleUserUsecase $indexCircleUserUsecase;

    public function __construct(IndexCircleUserUsecase $indexCircleUserUsecase)
    {
        $this->indexCircleUserUsecase = $indexCircleUserUsecase;
    }

    public function __invoke(Request $request, int $circleId): array
    {
        return [
            'data' => Arr::camel_keys(
                (new Collection($this->indexCircleUserUsecase->invoke($circleId)))->map(
                    fn ($circleUserValueObject) => $circleUserValueObject->toArray()
                )->toArray()
            ),
        ];
    }
}
