<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class StorageController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param string $name
     * @return Response|string
     * @throws FileNotFoundException
     */
    public function __invoke(Request $request, string $name)
    {
        return Storage::get($name);
    }
}
