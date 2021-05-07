<?php

namespace App\Exports\Sheets;

use App\Enum\Property\AdvertiseCounterHistoryProperty;
use App\Models\AdvertiseCounterHistory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class AdvertisesCounterHistorySheet implements FromCollection, WithHeadings, WithTitle
{
    private int $advertiseId;

    public function __construct(int $advertiseId)
    {
        $this->advertiseId = $advertiseId;
    }

    public function collection()
    {
        return AdvertiseCounterHistory::whereAdvertiseId($this->advertiseId)
            ->select([
                AdvertiseCounterHistoryProperty::count,
                AdvertiseCounterHistoryProperty::date,
                AdvertiseCounterHistoryProperty::link,
            ])
            ->orderBy(AdvertiseCounterHistoryProperty::link)
            ->orderBy(AdvertiseCounterHistoryProperty::date)
            ->get()
            ->map(function ($advertiseCounterHistory, $index) {
                // 必ず、数値を出力するようにするため
                $advertiseCounterHistory->count = $advertiseCounterHistory->count ?: '0';
                // 日付のフォーマット
                $advertiseCounterHistory->date = (new Carbon($advertiseCounterHistory->date))->format('Y/m/d');

                return (new Collection([$index + 1]))->merge($advertiseCounterHistory);
            });
    }

    public function headings(): array
    {
        return [
            'No',
            'クリック数',
            '日付',
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
        return '1日のクリック数';
    }
}
