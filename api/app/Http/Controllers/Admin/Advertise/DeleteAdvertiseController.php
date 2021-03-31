<?php

namespace App\Http\Controllers\Admin\Advertise;

use App\Http\Controllers\Controller;
use App\Models\Advertise;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DeleteAdvertiseController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $advertiseId
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function __invoke(Request $request, int $advertiseId)
    {
        Log::debug("DeleteAdvertiseController args advertiseId=$advertiseId");

        DB::beginTransaction();

        try {
            Advertise::findOrFail($advertiseId)->delete();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            Log::error("[ERROR] DeleteAdvertiseController", [
                "advertiseId" => $advertiseId,
            ]);

            throw $e;
        }
    }
}
