<?php

namespace App\Enum\SlugProperty;

final class CategorySlugProperty
{
    /**
     * 公認団体.
     */
    const official_organization = 'official_organization';
    /**
     * 非公認団体.
     */
    const unofficial_organization = 'unofficial_organization';
    /**
     * 学生団体.
     */
    const student_group = 'student_group';
    /**
     * 部活.
     */
    const club = 'club';

    public static function getAll(): array
    {
        return [
            self::official_organization,
            self::unofficial_organization,
            self::student_group,
            self::club,
        ];
    }
}
