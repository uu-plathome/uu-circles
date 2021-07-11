<?php

declare(strict_types=1);

namespace App\Http\Controllers\Circle\Storage;

use App\Http\Controllers\Controller;
use App\Http\Requests\Circle\CirclePutStorageRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

final class PutStorageController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param CirclePutStorageRequest $request
     *
     * @return array
     */
    public function __invoke(CirclePutStorageRequest $request): array
    {
        Log::debug('PutStorageController args none');

        $filename = $request->file('file')->store('');
        $url = Storage::url($filename);

        Log::debug('PutStorageController trace', [
            'filename' => $filename,
            'url'      => $url,
        ]);

        return [
            'url' => $url,
        ];
    }
}
