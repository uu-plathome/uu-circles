<?php

namespace App\Http\Controllers\Main\PagePosition;

use App\Events\Arg\TestPusherEventArg;
use App\Events\TestPusherEvent;
use App\Http\Controllers\Controller;

class CreatePagePositionController extends Controller
{
    public function __invoke()
    {
        $arg = new TestPusherEventArg();
        $arg->title = 'aaa';
        event(new TestPusherEvent($arg));
    }
}
