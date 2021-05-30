<?php

declare(strict_types=1);

namespace App\Usecases\CircleManagement\CircleTag;

use App\Models\CircleTag;
use App\Usecases\CircleManagement\CircleTag\Params\CreateOrUpdateCircleTagUsecaseParam;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class CreateOrUpdateCircleTagUsecase
{
    /**
     * サークルタグを作成するか更新する
     *
     * @param CreateOrUpdateCircleTagUsecaseParam $param
     * @return void
     * @throws Exception
     */
    public function invoke(
        CreateOrUpdateCircleTagUsecaseParam $param
    ) {
        Log::debug("CreateOrUpdateCircleTagUsecase args", [
            'CreateOrUpdateCircleTagUsecaseParam' => $param,
        ]);

        $circleId = $param->circle_id;
        // インサート用のデータ
        $shouldInsertCircleTag = $this->toShouldInsertData($param);

        DB::beginTransaction();
        try {
            // 過去のCircleTag取得
            $circleTag = CircleTag::whereCircleId($circleId)->first();

            if ($circleTag) {
                // 過去にタグを追加しているとき
                $circleTag->fill($shouldInsertCircleTag->toArray())->save();
            } else {
                // 過去にタグを追加していないとき
                $shouldInsertCircleTag->circle_id = $circleId;
                $shouldInsertCircleTag->save();
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();

            Log::error("CreateOrUpdateCircleTagUsecase [ERROR]", [
                'circleId'              => $circleId,
                'shouldInsertCircleTag' => $shouldInsertCircleTag,
            ]);

            throw $e;
        }
    }

    /**
     * インサート用のデータ
     *
     * @param CreateOrUpdateCircleTagUsecaseParam $param
     * @return CircleTag
     */
    protected function toShouldInsertData(CreateOrUpdateCircleTagUsecaseParam $param): CircleTag
    {
        $circleTag = new CircleTag();

        $circleTag->sport = $param->sport;
        $circleTag->music = $param->music;
        $circleTag->culture = $param->culture;
        $circleTag->volunteer = $param->volunteer;
        $circleTag->nature = $param->nature;
        $circleTag->international = $param->international;
        $circleTag->incare = $param->incare;
        $circleTag->loose = $param->loose;
        $circleTag->community = $param->community;
        $circleTag->programming = $param->programming;

        return $circleTag;
    }
}
