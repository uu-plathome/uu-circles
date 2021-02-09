<?php

namespace App\Http\Controllers\Admin\Advertise;

use App\Http\Controllers\Controller;
use App\Models\Advertise;
use App\Support\Arr;
use Illuminate\Http\Request;

class IndexAdvertiseController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function __invoke(Request $request)
    {
        $advertises = Advertise::all()->toArray();

        return [
            'data' => Arr::camel_keys($advertises),
        ];
    }
}
