<?php

namespace App\Http\Controllers\Admin\Advertise;

use App\Exports\AdvertisesExport;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Excel as ExcelType;

class DownloadAdvertiseExcelController
{
    /**
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function __invoke()
    {
        Log::debug("DownloadAdvertiseExcelController args none");

        return (new AdvertisesExport())
            ->download('advertise.xlsx', ExcelType::XLSX);
    }
}
