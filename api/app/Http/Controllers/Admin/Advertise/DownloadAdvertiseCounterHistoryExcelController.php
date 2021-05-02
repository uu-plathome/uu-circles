<?php

namespace App\Http\Controllers\Admin\Advertise;

use App\Exports\AdvertisesCounterHistoryExport;
use App\Models\Advertise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Excel as ExcelType;

class DownloadAdvertiseCounterHistoryExcelController
{
    /**
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function __invoke(Request $request, int $advertiseId)
    {
        Log::debug("DownloadAdvertiseCounterHistoryExcelController args none");

        $advertise = Advertise::findOrFail($advertiseId);
        Log::debug("DownloadAdvertiseCounterHistoryExcelController fetched Data", [
            'advertiseId' => $advertiseId,
            'advertise'   => $advertise,
        ]);

        return (new AdvertisesCounterHistoryExport($advertiseId))
            ->download('advertise_counter_histories.xlsx', ExcelType::XLSX);
    }
}
