<?php

namespace App\Exports;

use App\Enum\Property\AdvertiseProperty;
use App\Models\Advertise;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;

class AdvertisesExport implements FromCollection, WithHeadings
{
    use Exportable;

    public function collection()
    {
        return Advertise::select([
            AdvertiseProperty::id,
            AdvertiseProperty::title,
            AdvertiseProperty::advertise_type,
            AdvertiseProperty::link,
            AdvertiseProperty::slug,
            AdvertiseProperty::main_image_url,
            AdvertiseProperty::active,
            AdvertiseProperty::publish_from,
            AdvertiseProperty::publish_to,
        ])
            ->get()
            ->map(function ($advertiseCounterHistory, $index) {
                return (new Collection([$index + 1]))->merge($advertiseCounterHistory);
            });
    }

    public function headings(): array
    {
        return [
            'No',
            AdvertiseProperty::id,
            AdvertiseProperty::title,
            AdvertiseProperty::advertise_type,
            AdvertiseProperty::link,
            AdvertiseProperty::slug,
            AdvertiseProperty::main_image_url,
            AdvertiseProperty::active,
            AdvertiseProperty::publish_from,
            AdvertiseProperty::publish_to,
        ];
    }
}
