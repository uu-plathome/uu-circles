<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\Identification;

use App\Enum\Property\IdentifierHistoryProperty;
use App\Http\Controllers\Controller;
use App\Models\Identifier;
use App\Models\IdentifierHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class CheckIdentificationController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param $identifer_hash
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, $identifer_hash)
    {
        Log::debug('#CheckIdentificationController args: none');

        $identifier = Identifier::where('identifier_hash', $identifer_hash)->first();

        if (is_null($identifier)) {
            // ステータスコード400を返す
            return abort(400);
        }

        $identifierHistory = IdentifierHistory::whereIdentifierId($identifier->id)
            ->when($request->ip(), function ($query) use ($request) {
                $query->whereIpAddress($request->ip());
            })->when($request->userAgent(), function ($query) use ($request) {
                $query->whereUserAgent($request->userAgent());
            })->first();

        // 過去に情報がなければ、新しい情報を追加
        if (is_null($identifierHistory)) {
            // 識別子に情報を追加
            (new IdentifierHistory())->fill([
                IdentifierHistoryProperty::identifier_id => $identifier->id,
                IdentifierHistoryProperty::ip_address    => $request->ip(),
                IdentifierHistoryProperty::user_agent    => $request->userAgent(),
                IdentifierHistoryProperty::count         => 1,
            ])->save();
        } else {
            // 情報があれば、countを増やす
            $identifierHistory->increment(IdentifierHistoryProperty::count);
        }

        // ステータスコード200を返す
        return [];
    }
}
