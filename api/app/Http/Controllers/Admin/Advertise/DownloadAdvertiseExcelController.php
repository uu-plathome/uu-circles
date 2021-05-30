<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Advertise;

use App\Exports\AdvertisesExport;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Excel as ExcelType;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

final class DownloadAdvertiseExcelController
{
    /**
     * @return BinaryFileResponse
     */
    public function __invoke(): BinaryFileResponse
    {
        Log::debug("DownloadAdvertiseExcelController args none");

        return (new AdvertisesExport())
            ->download('advertise.xlsx', ExcelType::XLSX);
    }
}
