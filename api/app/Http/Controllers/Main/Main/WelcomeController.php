<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\Main;

use Illuminate\View\View;

final class WelcomeController
{
    public function __invoke(): View
    {
        return view('welcome');
    }
}
