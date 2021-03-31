<?php

namespace App\Usecases\Admin;

use App\Entity\CircleTagEntity;
use App\Models\CircleTag;
use Exception;
use Illuminate\Support\Facades\DB;

class CreateOrUpdateCircleTagUsecase
{
    /**
     * invoke
     *
     * @return void
     */
    public function invoke(
        int $circleId,
        CircleTagEntity $circleTagsEntity
    ) {
        DB::beginTransaction();
        $shouldInsertCircleTag = $circleTagsEntity->toCircleTag();

        try {
            $circleTag = CircleTag::whereCircleId($circleId)->first();
            if ($circleTag) {
                $circleTag->update($shouldInsertCircleTag->toArray());
            } else {
                $shouldInsertCircleTag->circle_id = $circleId;
                $shouldInsertCircleTag->save();
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
}
