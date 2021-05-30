<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Advertise;

use App\Http\Controllers\Controller;
use App\Models\Advertise;
use App\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class IndexAdvertiseController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function __invoke(Request $request)
    {
        Log::debug("IndexAdvertiseController args none");

        $advertises = Advertise::all()->toArray();

        return [
            'data' => Arr::camel_keys($advertises),
        ];
    }
}
