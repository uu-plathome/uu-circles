<?php

namespace App\Repositories\GoogleAnalytics\Entity;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class MultiplePageViewEntity
{
    /**
     * @var PageViewEntity[]
     */
    public array $pageViewEntities;

    public function toArray(): array
    {
        Log::debug("MultiplePageViewEntity toArray args none");
        
        return (new Collection($this->pageViewEntities))->map(
            fn (PageViewEntity $entity) => $entity->toArray()
        )->toArray();
    }
}
