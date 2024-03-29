<?php

declare(strict_types=1);

namespace App\Http\Controllers\Main\Gacha;

use App\Http\Controllers\Controller;
use App\Models\Circle;
use App\Models\CircleGachaResult;
use App\Support\Arr;
use App\UseCases\Main\Gacha\Dto\CircleGachaDto;
use App\UseCases\Main\Gacha\Dto\GachaSimpleCircleDto;
use App\UseCases\Main\Gacha\Dto\GachaSimpleCircleListDto;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

final class GachaResultController extends Controller
{
    /**
     * @param Request $request
     * @param string  $gachaHash
     *
     * @return array
     */
    public function __invoke(Request $request, string $gachaHash): array
    {
        Log::debug('GachaResultController args', [
            'gachaHash' => $gachaHash,
        ]);

        $circleGachaResult = CircleGachaResult::whereGachaHash($gachaHash)
            ->firstOrFail(); //結果かnullを返す(ただのfirst)→firstorFailで結果もしくは404返す

        //DBから引っ張ってくる result
        $fetchedDrewCircles = Circle::with([
            'circleInformation:circle_id,description,short_name,circle_type,is_club_activities',
            'circleHandbill',
        ])->whereRelease(true)
            ->whereIsOnlyDemo(false)
            // 新歓が登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->select([
                'id', 'name', 'slug',
            ])
            ->find(json_decode($circleGachaResult->result_circle_ids));

        /** @var \Illuminate\Support\Collection $fetchedDrewCircles */
        $foundDrewCircles = $fetchedDrewCircles->map(
            fn (Circle $circle) =>
            //型変換
            GachaSimpleCircleDto::byEloquent(
                $circle,
                $circle->circleInformation,
                $circle->circleHandbill
            )
        );

        //DBから引っ張ってくる  pickup
        $fetchedPickupCircles = Circle::with([
            'circleInformation:circle_id,description,short_name,circle_type,is_club_activities',
            'circleHandbill',
        ])
            ->whereRelease(true)
            ->whereIsOnlyDemo(false)
            // 新歓が登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->select([
                'id', 'name', 'slug',
            ])
            ->find(json_decode($circleGachaResult->pickup_circle_ids));

        /** @var \Illuminate\Support\Collection $fetchedPickupCircles */
        $foundPickupCircles = $fetchedPickupCircles->map(
            fn (Circle $circle) =>
            //型変換
            GachaSimpleCircleDto::byEloquent(
                $circle,
                $circle->circleInformation,
                $circle->circleHandbill
            )
        );

        $dto = new CircleGachaDto();
        $dto->gacha_hash = $circleGachaResult->gacha_hash;

        $resultCircleDto = new GachaSimpleCircleListDto();
        $resultCircleDto->list = $foundDrewCircles->toArray();
        $dto->result_circles = $resultCircleDto;

        $pickupCircleDto = new GachaSimpleCircleListDto();
        $pickupCircleDto->list = $foundPickupCircles->toArray();
        $dto->pickup_circles = $pickupCircleDto;

        $dto->created_at = $circleGachaResult->created_at instanceof Carbon ? $circleGachaResult->created_at : null;
        $dto->count = $foundDrewCircles->count();

        return Arr::camel_keys($dto->toArray());
    }
}
