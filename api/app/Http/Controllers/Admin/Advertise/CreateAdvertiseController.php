<?php

namespace App\Http\Controllers\Admin\Advertise;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Advertise\CreateAdvertiseRequest;
use App\Models\Advertise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CreateAdvertiseController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(CreateAdvertiseRequest $request)
    {
        DB::beginTransaction();

        try {
            $request->makeAdvertise()->save();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
