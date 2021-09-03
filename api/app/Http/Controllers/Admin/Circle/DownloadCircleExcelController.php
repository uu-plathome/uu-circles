<?php

declare(strict_types=1);


namespace App\Http\Controllers\Admin\Circle;

use App\Exports\CircleExport;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Excel as ExcelType;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

final class DownloadCircleExcelController
{
    /**
     * @return BinaryFileResponse
     */
    public function __invoke(): BinaryFileResponse
    {
        Log::debug('DownloadCircleExcelController args none');

        return (new CircleExport())
            ->download('circle_list.xlsx', ExcelType::XLSX);
    }
}
