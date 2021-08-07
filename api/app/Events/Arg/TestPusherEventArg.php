<?php

namespace App\Events\Arg;

use App\Models\PagePositionHistory;
use Illuminate\Support\Collection;

final class TestPusherEventArg
{
    public string $pageUrl;

    /**
     * @var PagePositionItemArg[]
     */
    public array $pagePositions;

    public static function byEloquent(Collection $pagePositions): self
    {
        $arg = new self();

        $arg->pageUrl = $pagePositions->first()->pageUrl;
        $arg->pagePositions = $pagePositions->map(
            fn (PagePositionHistory $pagePositionHistory) =>
                PagePositionItemArg::byEloquent($pagePositionHistory)
        )->toArray();
        
        return $arg;
    }
}
