<?php


namespace App\Usecases\Main\Gacha;


use App\Dto\GachaPickupListDto;
use App\Models\Circle;
use App\ValueObjects\CircleValueObject;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class DrawGachaUsecase
{

    //ピックアップ一覧取得のためのやつ
    private GetGachaPickupListUsecase $getGachaPickupListUsecase;

    public function  __construct(GetGachaPickupListUsecase $getGachaPickupListUsecase)
    {
        $this->getGachaPickupListUsecase = $getGachaPickupListUsecase;
    }


    public  function invoke(int $drawCount)
    {
        Log::debug('DrawGachaUsecase args none');

        /** 
         * ピックアップ一覧取得
         * @var \App\Dto\GachaPickupListDto $pickupList  
         */ 
        $pickupList = Cache::remember(
            GachaPickupListKey::getCacheKey(),
            60*60*24,
            fn()=>$this->getGachaPickupListUsecase->invoke()
        );

        $limit=$drawCount>=10?$drawCount+2:$drawCount+1;//10連のときは+2だが、それ以下では+1分多くサークル取る
        
        /** @var \App\Models\Circle $circles */ 
        $circles = Circle::with([
            'circleHandbill:circle_id,image_url',
        ])->whereRelease(true)
            // 新歓が登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->select([
                'id', 'name', 'release', 'slug'
            ])
            ->inRandomOrder()
            ->take($limit)
            ->get();

        /** @var \Illuminate\Support\Collection $circles */ 
        $foundCircles = $circles->map(
            fn (Circle $circle) =>
            //型変換
            CircleValueObject::byEloquent(
                $circle,
                null,
                $circle->circleHandbill
            )
        );

        //ピックアップ処理を行う
        $pickupCircles=$foundCircles->filter(function(CircleValueObject $cvo) use($pickupList) {
            $pickupListCircles= new Collection($pickupList->pickupCircles);
            $found=$pickupListCircles->first(
                //ピックアップのサークル と DBからランダムで拾ってきたサークル の一致
                fn(CircleValueObject $pickupCvo)=>$pickupCvo->id===$cvo->id
            );
            return !is_null($found);
        });
        Log::debug('DrawGachaUsecase pickupCircles', [$pickupCircles]);
        
        //ピックアップじゃないリストの処理
        $notPickupCircles=$foundCircles->filter(function(CircleValueObject $cvo) use($pickupList) {
            $pickupListCircles= new Collection($pickupList->pickupCircles);
            $found=$pickupListCircles->first(
                //ピックアップのサークル と DBからランダムで拾ってきたサークル の一致
                fn(CircleValueObject $pickupCvo)=>$pickupCvo->id===$cvo->id
            );
            return is_null($found);
        });
        Log::debug('DrawGachaUsecase notPickupCircles', [$notPickupCircles]);


        //値の確定 コレクション
        $drewCircles=new Collection([]);
        
        //ピックアップ引く
        $drewCircles=$drewCircles->merge($pickupCircles->count() < $drawCount ? $pickupCircles : $pickupCircles->slice(0,$drawCount) );
        Log::debug('DrawGachaUsecase drewCircles ピックアップ引く', [$drewCircles]);
        
        //ピックアップで足りないものを取ってくる
        $drewCircles=$drewCircles->merge($drewCircles->count()===$drawCount ? []:  $notPickupCircles->slice(0,$drawCount - $drewCircles->count()));
        Log::debug('DrawGachaUsecase drewCircles ピックアップで足りないものを取ってくる', [$drewCircles]);


        return $drewCircles->toArray();

    }
}