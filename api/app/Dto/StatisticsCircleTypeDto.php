<?php

namespace App\Dto;

/**
 * サークル種別
 */
class StatisticsCircleTypeDto
{
    /**
     * 公認団体
     *
     * @var int
     */
    public int $officialOrganization;

    /**
     * 非公認団体
     *
     * @var int
     */
    public int $unofficialOrganization;

    /**
     * 届出団体
     *
     * @var int
     */
    public int $sendingOrganization;

    /**
     * 学生団体
     *
     * @var int
     */
    public int $studentGroup;

    public function toArray(): array
    {
        return [
            'official_organization'   => $this->officialOrganization,
            'unofficial_organization' => $this->unofficialOrganization,
            'sending_organization'    => $this->sendingOrganization,
            'student_group'           => $this->studentGroup,
        ];
    }
}
