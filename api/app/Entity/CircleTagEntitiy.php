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

    public static function byEloquent(
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

    public static function of(array $arr): CircleTagEntitiy
    {
        $circleTagEntity = new CircleTagEntitiy();
        $circleTagEntity->circleTag = $arr;
        return $circleTagEntity;
    }

    public function toArray()
    {
        return $this->circleTag;
    }

    public function toCircleTag(): CircleTag
    {
        $circleTag = new CircleTag();
        $circleTag->volunteer = in_array(CircleTagModel::VOLUNTEER, $this->circleTag, true);
        $circleTag->nature = in_array(CircleTagModel::NATURE, $this->circleTag, true);
        $circleTag->international = in_array(CircleTagModel::INTERNATIONAL, $this->circleTag, true);
        $circleTag->incare = in_array(CircleTagModel::INCARE, $this->circleTag, true);
        $circleTag->loose = in_array(CircleTagModel::LOOSE, $this->circleTag, true);
        $circleTag->community = in_array(CircleTagModel::COMMUNITY, $this->circleTag, true);
        $circleTag->programming = in_array(CircleTagModel::PROGRAMMING, $this->circleTag, true);
        $circleTag->urgent_recruitment = in_array(CircleTagModel::URGENT_RECRUITMENT, $this->circleTag, true);
        $circleTag->mystery = in_array(CircleTagModel::MYSTERY, $this->circleTag, true);

        return $circleTag;
    }
}
