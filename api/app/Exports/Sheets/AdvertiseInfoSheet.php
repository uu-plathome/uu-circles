<?php

namespace App\Exports\Sheets;

use App\Enum\Property\AdvertiseProperty;
use App\Models\Advertise;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class AdvertiseInfoSheet implements FromCollection, WithHeadings, WithTitle
{
    private int $advertiseId;

    public function __construct(int $advertiseId)
    {
        $this->advertiseId = $advertiseId;
    }

    public function collection()
    {
        return Advertise::whereId($this->advertiseId)
            ->select([
                AdvertiseProperty::title,
                AdvertiseProperty::link,
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
            '広告名',
            'リンク',
        ];
    }

    /**
     * シート名.
     *
     * @return string
     */
    public function title(): string
    {
        return '現在の広告情報';
    }
}
