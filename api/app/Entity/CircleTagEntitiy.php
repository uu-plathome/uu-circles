<?php

namespace App\Entity;

use App\Enum\CircleTagModel;
use App\Models\CircleInformation;
use App\Models\CircleTag;

class CircleTagEntitiy
{
    /**
     * @var CircleTagModel[]
     */
    public array $circleTag = [];

    public function byEloquent(
        CircleInformation $circleInformation,
        CircleTag $circleTag
    ): CircleTagEntitiy {
        $circleTagEntity = new CircleTagEntitiy();

        if ($circleTag->volunteer) {
            $circleTagEntity->circleTag[] = CircleTagModel::VOLUNTEER;
        }
        if ($circleTag->nature) {
            $circleTagEntity->circleTag[] = CircleTagModel::NATURE;
        }
        if ($circleTag->international) {
            $circleTagEntity->circleTag[] = CircleTagModel::INTERNATIONAL;
        }
        if ($circleTag->incare) {
            $circleTagEntity->circleTag[] = CircleTagModel::INCARE;
        }
        if ($circleTag->loose) {
            $circleTagEntity->circleTag[] = CircleTagModel::LOOSE;
        }
        if ($circleTag->community) {
            $circleTagEntity->circleTag[] = CircleTagModel::COMMUNITY;
        }
        if ($circleTag->programming) {
            $circleTagEntity->circleTag[] = CircleTagModel::PROGRAMMING;
        }
        if ($circleTag->urgent_recruitment) {
            $circleTagEntity->circleTag[] = CircleTagModel::URGENT_RECRUITMENT;
        }
        if ($circleTag->mystery) {
            $circleTagEntity->circleTag[] = CircleTagModel::MYSTERY;
        }
        if ($circleInformation->activeActivity) {
            $circleTagEntity->circleTag[] = CircleTagModel::ACTIVE_ACTIVITY;
        }
        if ($circleInformation->mammoth) {
            $circleTagEntity->circleTag[] = CircleTagModel::MAMMOTH;
        }

        return $circleTagEntity;
    }

    public function toArray()
    {
        return $this->circleTag;
    }
}
