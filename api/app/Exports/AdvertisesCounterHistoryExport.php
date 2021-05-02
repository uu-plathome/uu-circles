<?php

namespace App\Exports;

use App\Models\AdvertiseCounterHistory;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;

class AdvertisesCounterHistoryExport implements FromCollection
{
    use Exportable;

    private int $advertiseId;

    public function __construct(int $advertiseId)
    {
        $this->advertiseId = $advertiseId;
    }

    public function collection()
    {
        return AdvertiseCounterHistory::whereAdvertiseId($this->advertiseId)
            ->get();
    }
}
