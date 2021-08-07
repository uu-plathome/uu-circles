<?php

namespace App\Http\Controllers\Main\PagePosition;

use App\Enum\Property\PagePositionHistoryProperty;
use App\Events\Arg\TestPusherEventArg;
use App\Events\TestPusherEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Main\PagePosition\CreatePagePositionRequest;
use App\Models\PagePositionHistory;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class CreatePagePositionController extends Controller
{
    /**
     * ユーザーのページ位置を記録し、
     * 送信してきたユーザーのページ位置を見ている他のユーザーの位置情報を更新する
     *
     * @param CreatePagePositionRequest $request
     * @return bool[]|void
     */
    public function __invoke(CreatePagePositionRequest $request)
    {
        Log::debug('CreatePagePositionController args none');

        $requestPagePositionId = $request->get('pagePositionId');
        $requestPageUrl = $request->get('pageUrl');
        // 識別子取得
        $identifierHash = $request->query('X-IDENTIFIER_HASH');

        Log::debug('CreatePagePositionController request value', [
            'pagePositionId'    => $requestPagePositionId,
            'pageUrl'           => $requestPageUrl,
            'X-IDENTIFIER_HASH' => $identifierHash,
        ]);

        $identifier =  Identifier::whereIdentifierHash($identifierHash)
            ->hasByNonDependentSubquery('identifierHistory', function ($query) use ($request) {
                $query->whereUserAgent($request->userAgent());
                $query->whereIpAddress($request->ip());
            })->first();

        // 識別子が存在しない場合は、バリデーションエラーを出す
        if (is_null($identifier)) {
            return abort(422);
        }

        // ページの位置を記録する
        (new PagePositionHistory())->fill([
            PagePositionHistoryProperty::identifier_id    => $identifier->id,
            PagePositionHistoryProperty::page_url         => $requestPageUrl,
            PagePositionHistoryProperty::page_position_id => $requestPagePositionId,
        ]);
        
        /** @var Collection $pagePositionsByPageUrl */
        $pagePositionsByPageUrl = PagePositionHistory::wherePageUrl($requestPageUrl)
            // 3s以内
            ->where(
                PagePositionHistoryProperty::created_at, 
                '<=', 
                date('Y-m-d H:i:s', time()-3)
            )
            ->orderByDesc(PagePositionHistoryProperty::created_at)
            ->get([
                PagePositionHistoryProperty::identifier_id,
                PagePositionHistoryProperty::page_position_id,
                PagePositionHistoryProperty::page_url,
                PagePositionHistoryProperty::created_at
            ])
            ->unique(PagePositionHistoryProperty::identifier_id)
            ->values()
            ->all();

        $arg = TestPusherEventArg::byEloquent($pagePositionsByPageUrl);
        event(new TestPusherEvent($arg));
        return [
            'data' => true,
        ];
    }
}
