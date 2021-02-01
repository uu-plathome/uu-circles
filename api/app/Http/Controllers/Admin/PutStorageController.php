<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminPutStorageRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PutStorageController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param AdminPutStorageRequest $request
     * @return array
     */
    public function __invoke(AdminPutStorageRequest $request): array
    {
        $filename = $request->file('file')->store('');
        $url = Storage::url($filename);

        return [
            'url' => $url,
        ];
    }
}
