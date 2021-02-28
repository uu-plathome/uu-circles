<?php

namespace App\Enum\SlugProperty;

class CategorySlugProperty
{
    const official_organization = 'official_organization';
    const unofficial_organization = 'unofficial_organization';
    const student_group = 'student_group';
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
