<?php

namespace App\Http\Controllers\Admin\Advertise;

use App\Http\Controllers\Controller;
use App\Models\Advertise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        DB::beginTransaction();

        try {
            Advertise::findOrFail($advertiseId)->delete();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
