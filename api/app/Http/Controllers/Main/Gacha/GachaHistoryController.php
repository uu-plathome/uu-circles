<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\Gacha;

use App\Http\Controllers\Controller;
use App\Models\Identifier;
use App\Support\Arr;
use App\UseCases\Main\Gacha\GachaHistoryByIdentifierHashUsecase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class GachaHistoryController extends Controller
{
    public function __construct(
        private GachaHistoryByIdentifierHashUsecase $gachaHistoryByIdentifierHashUsecase
    ) {
    }

    public function __invoke(Request $request)
    {
        // 識別子取得
        $identifierHash = $request->query('X-IDENTIFIER_HASH');
        Log::debug('identifierHash', [$identifierHash]);
        if (
            Identifier::whereIdentifierHash($identifierHash)
            ->hasByNonDependentSubquery('identifierHistory', function ($query) use ($request) {
                $query->whereUserAgent($request->userAgent());
                $query->whereIpAddress($request->ip());
            })
            ->doesntExist()
        ) {
            return abort(422);
        }

        $history = $this->gachaHistoryByIdentifierHashUsecase->invoke($identifierHash);

        return Arr::camel_keys([
            'history' => $history->toArray(),
        ]);
    }
}
