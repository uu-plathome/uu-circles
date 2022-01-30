<?php

declare(strict_types=1);

namespace App\UseCases\Main\Gacha;

use App\Models\Circle;
use App\Models\CircleGachaResult;
use App\UseCases\Main\Gacha\Dto\CircleGachaDto;
use App\UseCases\Main\Gacha\Dto\GachaSimpleCircleDto;
use App\UseCases\Main\Gacha\Dto\GachaSimpleCircleListDto;
use App\UseCases\Main\Gacha\Params\DrawGachaUsecaseParam;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

final class DrawGachaUsecase
{
    //ピックアップ一覧取得のためのやつ
    private GetGachaPickupListUsecase $getGachaPickupListUsecase;

    public function __construct(GetGachaPickupListUsecase $getGachaPickupListUsecase)
    {
        $this->getGachaPickupListUsecase = $getGachaPickupListUsecase;
    }

    public function invoke(DrawGachaUsecaseParam $param): CircleGachaDto
    {
        Log::debug('DrawGachaUsecase args none', [
            'DrawGachaUsecaseParam' => $param,
        ]);

        $drawCount = $param->drawCount;

        /**
         * ピックアップ一覧取得.
         *
         * @var \App\UseCases\Main\Gacha\Dto\GachaPickupListDto $pickupList
         */
        $pickupList = Cache::remember(
            GachaPickupListKey::getCacheKey(),
            60 * 60 * 2,
            fn () => $this->getGachaPickupListUsecase->invoke(Carbon::today())
        );

        Log::debug('DrawGachaUsecase ピックアップ一覧取得', [$pickupList]);

        $limit = $drawCount >= 10 ? $drawCount + 2 : $drawCount + 1; //10連のときは+2だが、それ以下では+1分多くサークル取る

        /** @var \App\Models\Circle $circles */
        $circles = Circle::with([
            'circleInformation:circle_id,description,short_name,circle_type,is_club_activities',
            'circleHandbill:circle_id,image_url',
        ])->whereRelease(true)
            ->whereIsOnlyDemo(false)
            // 新歓が登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->select([
                'id', 'name', 'release', 'slug',
            ])
            ->inRandomOrder()
            ->take($limit)
            ->get();

        /** @var \Illuminate\Support\Collection $circles */
        $foundCircles = $circles->map(
            fn (Circle $circle) =>
            // 型変換
            GachaSimpleCircleDto::byEloquent(
                $circle,
                $circle->circleInformation,
                $circle->circleHandbill
            )
        );

        $pickupListCirclesCollection = new Collection($pickupList->pickupCircles->list);

        //ピックアップ処理を行う
        $pickupCircles = $foundCircles->filter(function (GachaSimpleCircleDto $cvo) use ($pickupListCirclesCollection) {
            $pickupListCircles = $pickupListCirclesCollection;
            $found = $pickupListCircles->first(
                //ピックアップのサークル と DBからランダムで拾ってきたサークル の一致
                fn (GachaSimpleCircleDto $pickupCvo) => $pickupCvo->circleId === $cvo->circleId
            );

            return !is_null($found);
        });
        Log::debug('DrawGachaUsecase pickupCircles', [$pickupCircles]);

        //ピックアップじゃないリストの処理
        $notPickupCircles = $foundCircles->filter(function (GachaSimpleCircleDto $cvo) use ($pickupListCirclesCollection) {
            $pickupListCircles = $pickupListCirclesCollection;
            $found = $pickupListCircles->first(
                //ピックアップのサークル と DBからランダムで拾ってきたサークル の一致
                fn (GachaSimpleCircleDto $pickupCvo) => $pickupCvo->circleId === $cvo->circleId
            );

            return is_null($found);
        });
        Log::debug('DrawGachaUsecase notPickupCircles', [$notPickupCircles]);

        //値の確定 コレクション
        $drewCircles = new Collection([]);

        //ピックアップ引く
        $drewCircles = $drewCircles->merge($pickupCircles->count() < $drawCount
            ? $pickupCircles
            : $pickupCircles->slice(0, $drawCount));
        Log::debug('DrawGachaUsecase drewCircles ピックアップ引く', [$drewCircles]);

        //ピックアップで足りないものを取ってくる
        $drewCircles = $drewCircles->merge($drewCircles->count() === $drawCount
            ? []
            : $notPickupCircles->slice(0, $drawCount - $drewCircles->count()));
        Log::debug('DrawGachaUsecase drewCircles ピックアップで足りないものを取ってくる', [$drewCircles]);

        //idのみ抽出
        $drewCircleIds = $drewCircles
            ->map(fn (GachaSimpleCircleDto $cvo) => $cvo->circleId)
            ->values()
            ->toArray();
        $pickupCircleIds = (new Collection($pickupList->pickupCircles->list))
            ->map(fn (GachaSimpleCircleDto $cvo) => $cvo->circleId)
            ->values()
            ->toArray();

        //DBに挿入
        $data = [
            'result_circle_ids' => json_encode($drewCircleIds),
            'pickup_circle_ids' => json_encode($pickupCircleIds),
            'gacha_hash'        => Str::uuid()->toString(),
            'identifier_hash'   => $param->identifierHash,
        ];
        $circleGachaResult = CircleGachaResult::create($data);

        $dto = new CircleGachaDto();
        $dto->gacha_hash = $circleGachaResult->gacha_hash;

        // ガチャ結果
        $resultCirclesDto = new GachaSimpleCircleListDto();
        $resultCirclesDto->list = $drewCircles->toArray();
        $dto->result_circles = $resultCirclesDto;

        // pickup
        $dto->pickup_circles = $pickupList->pickupCircles;

        $dto->created_at = $circleGachaResult->created_at;
        $dto->count = $drawCount;

        return $dto;
    }
}
