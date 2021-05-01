<?php


namespace App\Http\Controllers\Main\Gacha;

use App\Dto\CircleGachaDto;
use App\Http\Controllers\Controller;
use App\Models\Circle;
use App\Models\CircleGachaResult;
use App\Support\Arr;
use App\Usecases\Main\Gacha\DrawGachaUsecase;
use App\Usecases\Main\Gacha\GachaPickupListKey;
use App\Usecases\Main\Gacha\Params\DrawGachaUsecaseParam;
use App\ValueObjects\CircleValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class GachaResultController  extends Controller
{

    public function __invoke(Request $request,string $gachaHash)
    {
        Log::debug('GachaResultController args none',[
            'gachaHash'=>$gachaHash,
        ]);

        $circleGachaResult=CircleGachaResult::whereGachaHash($gachaHash)
        ->firstOrFail();//結果かnullを返す(ただのfirst)→firstorFailで結果もしくは404返す

        //DBから引っ張ってくる result
        $fetchedDrewCircles=Circle::with('circleHandbill')->whereRelease(true)
        // 新歓が登録されているのものを取得
        ->hasByNonDependentSubquery('circleHandbill')
        ->select([
            'id', 'name', 'release', 'slug'
        ])->find($circleGachaResult->result_circle_ids);

         /** @var \Illuminate\Support\Collection $fetchedDrewCircles */ 
         $foundDrewCircles = $fetchedDrewCircles->map(
            fn (Circle $circle) =>
            //型変換
            CircleValueObject::byEloquent(
                $circle,
                null,
                $circle->circleHandbill
            )
        );

         //DBから引っ張ってくる  pickup
         $fetchedPickupCircles=Circle::with('circleHandbill')->whereRelease(true)
         // 新歓が登録されているのものを取得
         ->hasByNonDependentSubquery('circleHandbill')
         ->select([
             'id', 'name', 'release', 'slug'
         ])->find($circleGachaResult->pickup_circle_ids);
 
          /** @var \Illuminate\Support\Collection $fetchedPickupCircles */ 
          $foundPickupCircles = $fetchedPickupCircles->map(
             fn (Circle $circle) =>
             //型変換
             CircleValueObject::byEloquent(
                 $circle,
                 null,
                 $circle->circleHandbill
             )
         );


        $dto= new CircleGachaDto;
        $dto->gacha_hash=$circleGachaResult->gacha_hash;
        $dto->result_circles=$foundDrewCircles->toArray();
        $dto->pickup_circles=$foundPickupCircles->toArray();
        $dto->created_at=$circleGachaResult->created_at;
        $dto->count=$circleGachaResult->count;

        return Arr::camel_keys($dto->toArray());

       

    }
}