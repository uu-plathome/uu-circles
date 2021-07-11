<?php

declare(strict_types=1);

namespace App\Usecases\Main\PageView\Dto;

final class TagPageViewRankingDto
{
    public ?TagPageViewDto $first = null;
    public ?TagPageViewDto $second = null;
    public ?TagPageViewDto $third = null;
    public ?TagPageViewDto $fourth = null;
    public ?TagPageViewDto $fifth = null;
    public ?TagPageViewDto $sixth = null;
    public ?TagPageViewDto $seventh = null;
    public ?TagPageViewDto $eighth = null;
    public ?TagPageViewDto $ninth = null;
    public ?TagPageViewDto $tenth = null;

    public function toArray(): array
    {
        return [
            'first'   => $this->first ? $this->first->toArray() : null,
            'second'  => $this->second ? $this->second->toArray() : null,
            'third'   => $this->third ? $this->third->toArray() : null,
            'fourth'  => $this->fourth ? $this->fourth->toArray() : null,
            'fifth'   => $this->fifth ? $this->fifth->toArray() : null,
            'sixth'   => $this->sixth ? $this->sixth->toArray() : null,
            'seventh' => $this->seventh ? $this->seventh->toArray() : null,
            'eighth'  => $this->eighth ? $this->eighth->toArray() : null,
            'ninth'   => $this->ninth ? $this->ninth->toArray() : null,
            'tenth'   => $this->tenth ? $this->tenth->toArray() : null,
        ];
    }
}
