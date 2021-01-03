<?php

namespace App\Console\Commands\ValueObjects;

class ReplaceValueObject
{
    public string $search;
    public string $replace;

    public function __construct(string $search, string $replace)
    {
        $this->search = $search;
        $this->replace = $replace;
    }
}
