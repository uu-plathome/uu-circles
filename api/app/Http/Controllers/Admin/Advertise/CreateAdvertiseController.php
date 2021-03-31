<?php

namespace App\Http\Controllers\Admin\Advertise;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Advertise\CreateAdvertiseRequest;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
        Log::debug("CreateAdvertiseController args none");

        DB::beginTransaction();

        try {
            $request->makeAdvertise()->save();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            Log::error("[ERROR] CreateAdvertiseController", [
                "advertise" => $request->makeAdvertise(),
            ]);

            throw $e;
        }
    }
}
