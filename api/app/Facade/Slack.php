<?php

namespace App\Facade;

use Illuminate\Support\Facades\Facade as BaseFacade;

class Slack extends BaseFacade
{
    protected static function getFacadeAccessor()
    {
        return 'slack';
    }
}
