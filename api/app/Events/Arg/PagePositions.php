<?php

namespace App\Events\Arg;

use App\Models\PagePositionHistory;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

final class PagePositions
{
    public string $pageUrl;

    public string $pageName;

    /**
     * @var PagePositionItemArg[]
     */
    public array $pagePositions;

    public static function byEloquent(Collection $pagePositions): self
    {
        $arg = new self();
        Log::debug('pagePositions', [
            'pagePositions' => $pagePositions,
        ]);

        if (count($pagePositions->all()) === 0) {
            $arg->pageUrl = '';
            $arg->pageName = '';
            $arg->pagePositions = [];

            return $arg;
        }

        $arg->pageUrl = $pagePositions->first()->page_url;
        $arg->pageName = $pagePositions->first()->page_name;
        $arg->pagePositions = $pagePositions->map(
            fn (PagePositionHistory $pagePositionHistory) => PagePositionItemArg::byEloquent($pagePositionHistory)
        )->toArray();

        return $arg;
    }
}
