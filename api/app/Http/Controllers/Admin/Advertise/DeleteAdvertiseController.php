<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Advertise;

use App\Http\Controllers\Controller;
use App\Models\Advertise;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class DeleteAdvertiseController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param int                      $advertiseId
     *
     * @throws \Exception
     *
     * @return \Illuminate\Http\Response
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

            Log::error('[ERROR] DeleteAdvertiseController', [
                'advertiseId' => $advertiseId,
            ]);

            throw $e;
        }
    }
}
