<?php

namespace App\Usecases\Admin;

use App\Entity\CircleTagEntitiy;
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
        CircleTagEntitiy $circleTagsEntity
    ) {
        DB::beginTransaction();
        $shouldInsertCircleTag = $circleTagsEntity->toCircleTag();

        try {
            $circleTag = CircleTag::whereCircleId($circleId)->first();
            if ($circleTag) {
                $circleTag->update($shouldInsertCircleTag->toArray());
            } else {
                (new CircleTag())->fill([
                    'circle_id' => $circleId,
                    ...$shouldInsertCircleTag->toArray(),
                ]);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
}
