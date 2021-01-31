<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminPutStorageRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
        $fp = $request->file('file');
        $url = Storage::putFile('', $fp);

        return [
            'url' => $url,
        ];
    }
}
