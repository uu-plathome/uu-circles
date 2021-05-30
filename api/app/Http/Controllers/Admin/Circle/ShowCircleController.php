<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Circle;

use App\Http\Controllers\Controller;
use App\Models\Circle;
use App\Support\Arr;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class ShowCircleController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param int $id
     * @return array
     */
    public function __invoke(Request $request, int $id): array
    {
        Log::debug("ShowCircleController args none");

        $circle = Circle::findOrFail($id);

        return [
            'data' => Arr::camel_keys(CircleValueObject::byEloquent(
                $circle,
                $circle->circleInformation,
                $circle->circleHandbill ?? null
            )->toArray())
        ];
    }
}
