<?php

namespace App\Http\Controllers\Main\PagePosition;

use App\Enum\Property\PagePositionHistoryProperty;
use App\Events\Arg\PagePositions;
use App\Events\SendPagePosition;
use App\Http\Controllers\Controller;
use App\Http\Requests\Main\PagePosition\CreatePagePositionRequest;
use App\Models\Identifier;
use App\Models\PagePositionHistory;
use App\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class CreatePagePositionController extends Controller
{
    /**
     * ユーザーのページ位置を記録し、
     * 送信してきたユーザーのページ位置を見ている他のユーザーの位置情報を更新する.
     *
     * 1. 2人以上のアクセスのときに、イベント発生
     * 2. スマホのときは記録のみをして、イベント発生させない
     * 3. 9:00 ~ 26:00 のときに、イベントを発生
     *
     * @param CreatePagePositionRequest $request
     *
     * @return bool[]|void
     */
    public function __invoke(CreatePagePositionRequest $request)
    {
        Log::debug('CreatePagePositionController args none');

        $now = Carbon::now();

        $requestPagePositionId = $request->get('pagePositionId');
        $requestPageUrl = $request->get('pageUrl');
        $requestPageName = $request->get('pageName');
        $requestScreenWidth = intval($request->get('screenWidth', 320));
        $requestScreenHeight = intval($request->get('screenHeight', 0));

        // 識別子取得
        $identifierHash = $request->query('X-IDENTIFIER_HASH');

        Log::debug('CreatePagePositionController request value', [
            'pagePositionId'    => $requestPagePositionId,
            'pageUrl'           => $requestPageUrl,
            'pageName'          => $requestPageName,
            'screenWidth'       => $requestScreenWidth,
            'screenHeight'      => $requestScreenHeight,
            'X-IDENTIFIER_HASH' => $identifierHash,
        ]);

        /** @var \App\Models\Identifier $identifier */
        $identifier = Cache::remember(
            'CreatePagePositionController.identifier.identifierHash=' . $identifierHash . 'ip=' . $request->ip() . 'user_agent=' . $request->userAgent(),
            300,
            fn () => Identifier::whereIdentifierHash($identifierHash)
                ->hasByNonDependentSubquery('identifierHistory', function ($query) use ($request) {
                    $query->whereUserAgent($request->userAgent());
                    $query->whereIpAddress($request->ip());
                })->first()
        );

        // 識別子が存在しない場合は、バリデーションエラーを出す
        if (is_null($identifier)) {
            return abort(422);
        }

        // ページの位置を記録する
        $pagePositionHistory = new PagePositionHistory();
        $pagePositionHistory->fill([
            PagePositionHistoryProperty::identifier_id    => $identifier->id,
            PagePositionHistoryProperty::page_url         => $requestPageUrl,
            PagePositionHistoryProperty::page_name        => $requestPageName,
            PagePositionHistoryProperty::page_position_id => $requestPagePositionId,
            PagePositionHistoryProperty::screen_width     => $requestScreenWidth,
            PagePositionHistoryProperty::screen_height    => $requestScreenHeight,
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
            $searchStartTime = $now->timestamp - 3;
            $searchTimeFormat = 'Y-m-d H:i:s';

            // 他のページに遷移したユーザーを弾くために、関与したユーザーの履歴をまとめて取得
            $pagePositions = PagePositionHistory::with([
                'identifier:id,identifier_hash',
            ])
                // 3s以内
                ->where(
                    PagePositionHistoryProperty::created_at,
                    '<=',
                    date($searchTimeFormat, $searchStartTime)
                )
                ->where(function ($query) use ($requestPageUrl, $searchTimeFormat, $searchStartTime) {
                    // 今回のイベントで同じページにいるユーザーを取得
                    $query->wherePageUrl($requestPageUrl);
                })
                ->orWhere(function ($query) use ($requestPageUrl, $searchTimeFormat, $searchStartTime) {
                    // 今回のイベントに関係のあるユーザーの識別子ID一覧作成し、それらが他のページに遷移していた場合は弾きたいので、一緒に拾ってくる
                    $query->whereIn(
                        PagePositionHistoryProperty::identifier_id,
                        function ($query) use ($requestPageUrl, $searchTimeFormat, $searchStartTime) {
                            $query->select('identifier_id')
                                ->distinct()
                                ->from(with(new PagePositionHistory())->getTable())
                                ->where('page_url', $requestPageUrl)
                                ->where(
                                    PagePositionHistoryProperty::created_at,
                                    '<=',
                                    date($searchTimeFormat, $searchStartTime)
                                );
                        }
                    );
                })
                ->get([
                    PagePositionHistoryProperty::id,
                    PagePositionHistoryProperty::identifier_id,
                    PagePositionHistoryProperty::page_position_id,
                    PagePositionHistoryProperty::page_name,
                    PagePositionHistoryProperty::page_url,
                    PagePositionHistoryProperty::created_at,
                ]);

            // 他のページに遷移したユーザーを弾く
            $mergedPagePosition = (new Collection($pagePositions))
                ->sortByDesc(PagePositionHistoryProperty::created_at)
                ->values()
                ->unique(PagePositionHistoryProperty::identifier_id)
                ->values();

            Log::debug('CreatePagePositionController mergedPagePosition', [
                'mergedPagePosition' => $mergedPagePosition,
            ]);

            // リクエストが送られたページの位置データのみに加工
            $newPagePositionsByPageUrl = $mergedPagePosition->filter(
                fn (PagePositionHistory $pagePositionHistory) => $pagePositionHistory->page_url === $requestPageUrl
            )->values();

            Log::debug('CreatePagePositionController newPagePositionsByPageUrl', [
                'newPagePositionsByPageUrl' => $newPagePositionsByPageUrl,
            ]);

            // 2人以上のアクセスのときに、イベント発生
            if ($newPagePositionsByPageUrl->count() > 1) {
                Log::debug('CreatePagePositionController event happen');
                $arg = PagePositions::byEloquent($newPagePositionsByPageUrl);
                event(new SendPagePosition($arg));
            }
        }

        return Arr::camel_keys([
            'pagePositionHistoryId' => $pagePositionHistory->id,
            'createdAt'             => $pagePositionHistory->created_at,
            'data'                  => true,
        ]);
    }
}
