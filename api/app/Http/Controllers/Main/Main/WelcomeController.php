<?php

namespace App\Http\Controllers\Main\Main;

class WelcomeController
{
    public function __invoke()
    {
        return view('welcome');
    }
}
