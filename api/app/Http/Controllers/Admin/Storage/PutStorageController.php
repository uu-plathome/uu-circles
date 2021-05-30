<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Storage;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminPutStorageRequest;
use Illuminate\Support\Facades\Storage;

final class PutStorageController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param AdminPutStorageRequest $request
     * @return array
     */
    public function __invoke(AdminPutStorageRequest $request): array
    {
        $filename = $request->file('file')->store('/images');
        $url = Storage::url($filename);

        return [
            'url' => $url,
        ];
    }
}
