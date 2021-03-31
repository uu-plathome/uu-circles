<?php

namespace App\Http\Controllers\Admin\Advertise;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Advertise\UpdateAdvertiseRequest;
use App\Models\Advertise;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UpdateAdvertiseController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(UpdateAdvertiseRequest $request, int $advertiseId)
    {
        Log::debug("UpdateAdvertiseController args advertiseId=$advertiseId");

        DB::beginTransaction();

        try {
            Advertise::findOrFail($advertiseId)->update(
                $request->makeAdvertise()->toArray()
            );

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            Log::error("[ERROR] UpdateAdvertiseController", [
                "advertise" => $request->makeAdvertise(),
            ]);

            throw $e;
        }
    }
}
