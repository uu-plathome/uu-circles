<?php

namespace App\Exports;

use App\Exports\Sheets\AdvertiseCounterTotalSheet;
use App\Exports\Sheets\AdvertiseInfoSheet;
use App\Exports\Sheets\AdvertisesCounterHistorySheet;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class AdvertisesCounterHistoryExport implements WithMultipleSheets
{
    use Exportable;

    private int $advertiseId;

    public function __construct(int $advertiseId)
    {
        $this->advertiseId = $advertiseId;
    }

    /**
     * @return array
     */
    public function sheets(): array
    {
        return [
            new AdvertiseInfoSheet($this->advertiseId),
            new AdvertiseCounterTotalSheet($this->advertiseId),
            new AdvertisesCounterHistorySheet($this->advertiseId),
        ];
    }
}
