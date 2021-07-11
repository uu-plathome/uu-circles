<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Advertise;

use App\Http\Controllers\Controller;
use App\Models\Advertise;
use App\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class ShowAdvertiseController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param int     $advertiseId
     *
     * @return array
     */
    public function __invoke(Request $request, int $advertiseId): array
    {
        Log::debug("ShowAdvertiseController args advertiseId=$advertiseId");

        $advertise = Advertise::findOrFail($advertiseId)->toArray();

        return [
            'data' => Arr::camel_keys($advertise),
        ];
    }
}
