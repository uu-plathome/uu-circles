<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\Gacha;

use App\Http\Controllers\Controller;
use App\Models\Identifier;
use App\Support\Arr;
use App\UseCases\Main\Gacha\DrawGachaUsecase;
use App\UseCases\Main\Gacha\Params\DrawGachaUsecaseParam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class GachaDrawController extends Controller
{

    public function __construct(
        private DrawGachaUsecase $drawGachaUsecase
    ){
    }

    /**
     * 単発ガチャ：
     * - 2つのサークルをランダムに拾い、ピックアップと一致するものがあったら、それを取得する。
     * - ピックアップと一致しない場合は、一つ目のサークルを取得する。
     *
     * 10連ガチャ：
     * - 12つのサークルをランダムに拾い、ピックアップと一致するものを優先的にひろう。
     *
     * @param Request $request
     *
     * @return array|void
     */
    public function __invoke(Request $request)
    {
        Log::debug('GachaDrawController args none');
        $drawCount = $request->query('number', 1);

        // ヘッダーから識別子取得
        $identifierHash = $request->query('X-IDENTIFIER_HASH');

        //数字出なかったり、数値変だったりした場合を除外するバリデーション
        if (!is_numeric($drawCount) || $drawCount <= 0 || $drawCount > 10) {
            return abort(404);
        }

        Log::debug('identifierHash', [$identifierHash]);
        if (Identifier::whereIdentifierHash($identifierHash)->doesntExist()) {
            return abort(422);
        }

        $param = new DrawGachaUsecaseParam();
        $param->drawCount = intval($drawCount);
        $param->identifierHash = $identifierHash;

        $dto = $this->drawGachaUsecase->invoke($param); //drawGachaUsecaseにparamが渡る

        return Arr::camel_keys($dto->toArray());
    }
}
