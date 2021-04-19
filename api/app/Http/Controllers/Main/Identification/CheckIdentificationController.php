<?php

namespace App\Http\Controllers\Main\Identification;

use App\Enum\Property\IdentifierProperty;
use App\Http\Controllers\Controller;
use App\Models\Identifier;
use App\Support\Arr;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CheckIdentificationController extends Controller
{


    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, $identifer_hash)
    {
        Log::debug("#CheckIdentificationController args: none");

        $existIdentifer = Identifier::where("identifier_hash", $identifer_hash)->exists();

        if (!$existIdentifer) {
            // ステータスコード400を返す
            return abort(400);
        }

        // ステータスコード200を返す
        return [];
    }
}
