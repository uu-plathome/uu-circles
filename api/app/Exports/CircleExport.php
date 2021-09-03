<?php

declare(strict_types=1);

namespace App\Exports;

use App\Exports\Sheets\CircleInfoSheet;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

final class CircleExport implements WithMultipleSheets
{
    use Exportable;

    /**
     * @return array
     */
    public function sheets(): array
    {
        return [
            new CircleInfoSheet(),
        ];
    }
}
