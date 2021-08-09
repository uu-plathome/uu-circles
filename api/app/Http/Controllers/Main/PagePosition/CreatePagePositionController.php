<?php

namespace App\Http\Controllers\Main\PagePosition;

use App\Enum\Property\PagePositionHistoryProperty;
use App\Events\Arg\PagePositions;
use App\Events\SendPagePosition;
use App\Http\Controllers\Controller;
use App\Http\Requests\Main\PagePosition\CreatePagePositionRequest;
use App\Models\Identifier;
use App\Models\PagePositionHistory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class CreatePagePositionController extends Controller
{
    /**
     * ユーザーのページ位置を記録し、
     * 送信してきたユーザーのページ位置を見ている他のユーザーの位置情報を更新する
     *
     * 1. 2人以上のアクセスのときに、イベント発生
     * 2. スマホのときは記録のみをして、イベント発生させない
     * 3. 9:00 ~ 26:00 のときに、イベントを発生
     *
     * @param CreatePagePositionRequest $request
     * @return bool[]|void
     */
    public function __invoke(CreatePagePositionRequest $request)
    {
        Log::debug('CreatePagePositionController args none');

        $now = Carbon::now();

        $requestPagePositionId = $request->get('pagePositionId');
        $requestPageUrl = $request->get('pageUrl');
        $requestScreenWidth = intval($request->get('screenWidth', 320));

        // 識別子取得
        $identifierHash = $request->query('X-IDENTIFIER_HASH');

        Log::debug('CreatePagePositionController request value', [
            'pagePositionId'    => $requestPagePositionId,
            'pageUrl'           => $requestPageUrl,
            'X-IDENTIFIER_HASH' => $identifierHash,
        ]);

        $identifier = Identifier::whereIdentifierHash($identifierHash)
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
        ])->save();

        /**
         * 1. 2人以上のアクセスのときに、イベント発生
         * 2. PC、タグレットのときに、イベント発生
         * 3. 9:00 ~ 26:00 のときに、イベントを発生
         */
        if (
            // 2. PC、タグレットのときに、イベント発生
            $requestScreenWidth >= 768 &&
            // 3. 9:00 ~ 26:00 のときに、イベントを発生
            2 <= $now->hour || 9 <= $now->hour
        ) {
            /** @var Collection $pagePositionsByPageUrl */
            $pagePositionsByPageUrl = PagePositionHistory::with([
                'identifier:id,identifier_hash',
            ])
                ->wherePageUrl($requestPageUrl)
                // 3s以内
                ->where(
                    PagePositionHistoryProperty::created_at,
                    '<=',
                    date('Y-m-d H:i:s', time()-3)
                )
                ->get([
                    PagePositionHistoryProperty::identifier_id,
                    PagePositionHistoryProperty::page_position_id,
                    PagePositionHistoryProperty::page_url,
                    PagePositionHistoryProperty::created_at
                ]);

            // 関係のあるユーザーの識別子ID一覧作成
            $identifierId = $pagePositionsByPageUrl->map(
                fn (PagePositionHistory $pagePositionHistory) => $pagePositionHistory->identifier_id
            )->unique()
                ->values()
                ->toArray();

            // 他のページに遷移したユーザーを弾くために、関与したユーザーの履歴をまとめて取得
            $pagePositionsByIdentifier = PagePositionHistory::with([
                'identifier:id,identifier_hash',
            ])
                ->whereIn(PagePositionHistoryProperty::identifier_id, $identifierId)
                // 3s以内
                ->where(
                    PagePositionHistoryProperty::created_at,
                    '<=',
                    date('Y-m-d H:i:s', time()-3)
                )
                ->get([
                    PagePositionHistoryProperty::identifier_id,
                    PagePositionHistoryProperty::page_position_id,
                    PagePositionHistoryProperty::page_url,
                    PagePositionHistoryProperty::created_at
                ]);

            // 他のページに遷移したユーザーを弾く
            $mergedPagePosition = (new Collection($pagePositionsByPageUrl))->merge($pagePositionsByIdentifier)
                ->sortByDesc(PagePositionHistoryProperty::created_at)
                ->values()
                ->unique(PagePositionHistoryProperty::identifier_id)
                ->values();

            Log::debug('CreatePagePositionController mergedPagePosition', [
                'old' => (new Collection($pagePositionsByPageUrl))->merge($pagePositionsByIdentifier),
                'mergedPagePosition' => $mergedPagePosition
            ]);

            // リクエストが送られたページの位置データのみに加工
            $newPagePositionsByPageUrl = $mergedPagePosition->filter(
                fn (PagePositionHistory $pagePositionHistory) =>
                    $pagePositionHistory->page_url === $requestPageUrl
            )->values();

            Log::debug('CreatePagePositionController newPagePositionsByPageUrl', [
                'newPagePositionsByPageUrl' => $newPagePositionsByPageUrl
            ]);

            // 2人以上のアクセスのときに、イベント発生
            if ($newPagePositionsByPageUrl->count() > 1) {
                Log::debug('CreatePagePositionController event happen');
                $arg = PagePositions::byEloquent($newPagePositionsByPageUrl);
                event(new SendPagePosition($arg));
            }
        }

        return [
            'data' => true,
        ];
    }
}
