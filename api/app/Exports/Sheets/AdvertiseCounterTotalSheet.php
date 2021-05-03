<?php

namespace App\Exports\Sheets;

use App\Enum\Property\AdvertiseCounterProperty;
use App\Models\AdvertiseCounter;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class AdvertiseCounterTotalSheet implements FromCollection, WithHeadings, WithTitle
{
    private int $advertiseId;

    public function __construct(int $advertiseId)
    {
        $this->advertiseId = $advertiseId;
    }

    public function collection()
    {
        return AdvertiseCounter::whereAdvertiseId($this->advertiseId)
            ->select(DB::raw("sum(count) as count"))
            ->addSelect(AdvertiseCounterProperty::link)
            ->groupBy(AdvertiseCounterProperty::link)
            ->get()
            ->map(function ($advertiseCounterHistory, $index) {
                $advertiseCounterHistory->count = $advertiseCounterHistory->count ?: '0';
                return (new Collection([$index + 1]))->merge($advertiseCounterHistory);
            });
    }

    public function headings(): array
    {
        return [
            'No',
            'クリック数',
            'リンク',
        ];
    }

    /**
     * シート名
     *
     * @return string
     */
    public function title(): string
    {
        return '累計クリック数';
    }
}
