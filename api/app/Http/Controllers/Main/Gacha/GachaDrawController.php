<?php


namespace App\Http\Controllers\Main\Gacha;


use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Gacha\DrawGachaUsecase;
use App\Usecases\Main\Gacha\GachaPickupListKey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class GachaDrawController  extends Controller
{
    private DrawGachaUsecase $drawGachaUsecase;

    public function  __construct(DrawGachaUsecase $drawGachaUsecase)
    {
        $this->drawGachaUsecase = $drawGachaUsecase;
    }

    /*
    単発ガチャ：
    - 2つのサークルをランダムに拾い、ピックアップと一致するものがあったら、それを取得する。
    - ピックアップと一致しない場合は、一つ目のサークルを取得する。

    10連ガチャ：
    - 12つのサークルをランダムに拾い、ピックアップと一致するものを優先的にひろう。
    
     */
    public function __invoke(Request $request)
    {
        Log::debug('GachaDrawController args none');
        $drawCount=$request->query('number',1);

        //数字出なかったり、数値変だったりした場合を除外するバリデーション
        if (!is_numeric($drawCount) || $drawCount <= 0 || $drawCount >10 ) {
            return abort(404);
        }

        $drewCircles=$this->drawGachaUsecase->invoke(intval($drawCount));

        return Arr::camel_keys([
            "drewCircles"=> $drewCircles
        ]);
    }
}