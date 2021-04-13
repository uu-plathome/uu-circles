<?php

namespace App\Http\Controllers\Main\Identification;

use App\Enum\Property\IdentifierProperty;
use App\Http\Controllers\Controller;
use App\Models\Identifier;
use App\Support\Arr;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PublishIdentificationController extends Controller
{
    /**
     * UUIDをチェックする最大回数
     */
    const MAX_UUID_CHECK = 3;

    /**
     * 識別子発行API
     *
     * @param Request $request
     * @return array
     * @throws Exception
     */
    public function __invoke(Request $request)
    {
        Log::debug("#PublishIdentificationController args: none");

        DB::beginTransaction();
        try {
            for ($i = self::MAX_UUID_CHECK; $i > 0; $i--) {
                $hash = Identifier::generateIdentifierHash();
                // UUIDが存在していないことチェック
                if (Identifier::whereIdentifierHash($hash)->doesntExist()) {
                    $identifier = Identifier::create([
                        IdentifierProperty::identifier_hash => $hash
                    ]);
                    break;
                }
            }

            if ($i === 0) {
                $check = self::MAX_UUID_CHECK;
                throw new Exception("uuidがMAX_UUID_CHECK回重複しました MAX_UUID_CHECK=$check");
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error("PublishIdentificationController [ERROR]");
            throw $e;
        }

        return Arr::camel_keys([
            IdentifierProperty::identifier_hash => $identifier->identifier_hash
        ]);
    }
}
