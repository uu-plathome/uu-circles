<?php

namespace App\Http\Controllers\Admin\Advertise;

use App\Http\Controllers\Controller;
use App\Models\Advertise;
use App\Support\Arr;
use Illuminate\Http\Request;

class ShowAdvertiseController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param int $advertiseId
     * @return array
     */
    public function __invoke(Request $request, int $advertiseId): array
    {
        $advertise = Advertise::findOrFail($advertiseId)->toArray();

        return [
            'data' => Arr::camel_keys($advertise)
        ];
    }
}
