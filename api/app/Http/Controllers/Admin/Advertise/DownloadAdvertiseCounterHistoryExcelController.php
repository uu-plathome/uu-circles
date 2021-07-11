<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Advertise;

use App\Exports\AdvertisesCounterHistoryExport;
use App\Models\Advertise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Excel as ExcelType;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

final class DownloadAdvertiseCounterHistoryExcelController
{
    /**
     * @param Request $request
     * @param int     $advertiseId
     *
     * @return BinaryFileResponse
     */
    public function __invoke(Request $request, int $advertiseId): BinaryFileResponse
    {
        Log::debug('DownloadAdvertiseCounterHistoryExcelController args none');

        $advertise = Advertise::findOrFail($advertiseId);
        Log::debug('DownloadAdvertiseCounterHistoryExcelController fetched Data', [
            'advertiseId' => $advertiseId,
            'advertise'   => $advertise,
        ]);

        return (new AdvertisesCounterHistoryExport($advertiseId))
            ->download('advertise_counter_histories.xlsx', ExcelType::XLSX);
    }
}
