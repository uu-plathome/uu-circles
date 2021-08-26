<?php

namespace App\Enum\SlugProperty;

/**
 * /api/circle/tag/{tag}のtagのパス一覧.
 */
final class TagSlugProperty
{
    const sport = 'sport';
    const music = 'music';
    const culture = 'culture';
    const nature = 'nature';
    const community = 'community';
    const international = 'international';
    const incare = 'incare';
    const programming = 'programming';
    const volunteer = 'volunteer';
    const active_activity = 'active_activity';
    const loose = 'loose';
    const monday = 'monday';
    const tuesday = 'tuesday';
    const wednesday = 'wednesday';
    const thursday = 'thursday';
    const friday = 'friday';
    const only_monday = 'only_monday';
    const only_tuesday = 'only_tuesday';
    const only_wednesday = 'only_wednesday';
    const only_thursday = 'only_thursday';
    const only_friday = 'only_friday';
    const holiday = 'holiday';
    const mammoth = 'mammoth';
    const urgent_recruitment = 'urgent_recruitment';
    const mystery = 'mystery';
    const online = 'online';
    const mine = 'mine';
    const yoto = 'yoto';

    public static function getAll(): array
    {
        return [
            self::sport,
            self::music,
            self::culture,
            self::nature,
            self::community,
            self::international,
            self::incare,
            self::programming,
            self::volunteer,
            self::active_activity,
            self::loose,
            self::monday,
            self::tuesday,
            self::wednesday,
            self::thursday,
            self::friday,
            self::only_monday,
            self::only_tuesday,
            self::only_wednesday,
            self::only_thursday,
            self::only_friday,
            self::holiday,
            self::mammoth,
            self::urgent_recruitment,
            self::mystery,
            self::online,
            self::mine,
            self::yoto,
        ];
    }
}
