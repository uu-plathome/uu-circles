<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\Identification;

use App\Enum\Property\IdentifierHistoryProperty;
use App\Enum\Property\IdentifierProperty;
use App\Http\Controllers\Controller;
use App\Models\Identifier;
use App\Models\IdentifierHistory;
use App\Support\Arr;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class PublishIdentificationController extends Controller
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
                if (!Identifier::whereIdentifierHash($hash)->doesntExist()) {
                    continue;
                }

                $identifier = Identifier::create([
                    IdentifierProperty::identifier_hash => $hash
                ]);

                // 識別子に情報を追加
                (new IdentifierHistory())->fill([
                    IdentifierHistoryProperty::identifier_id => $identifier->id,
                    IdentifierHistoryProperty::ip_address    => $request->ip(),
                    IdentifierHistoryProperty::user_agent    => $request->userAgent(),
                    IdentifierHistoryProperty::count         => 1,
                ])->save();

                break;
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
