<?php

namespace App\Exports;

use App\Models\Advertise;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;

class AdvertisesExport implements FromCollection
{
    use Exportable;

    public function collection()
    {
        return Advertise::all();
    }
}
