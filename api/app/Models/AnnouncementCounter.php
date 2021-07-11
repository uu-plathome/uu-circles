<?php

namespace App\Models;

use App\Enum\AnnouncementPlace;
use App\Enum\Property\AnnouncementCounterProperty as P;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnnouncementCounter extends Model
{
    use HasFactory;

    protected $fillable = [
        P::announcement_id,
        P::announcement_place,
        P::count,
    ];

    /**
     * カラム数.
     *
     * @return int[]
     */
    public static function columnNumbers(): array
    {
        return [
            AnnouncementPlace::MAIN_FIXED_VIEW        => 30,
            AnnouncementPlace::MAIN_ANNOUNCEMENT_PAGE => 20,
            AnnouncementPlace::CIRCLE_FIXED_VIEW      => 10,
            AnnouncementPlace::CIRCLE_MAIL            => 10,
            AnnouncementPlace::ADMIN_FIXED_VIEW       => 5,
            AnnouncementPlace::ADMIN_MAIL             => 5,
            AnnouncementPlace::NEWJOY_DISCORD         => 20,
            AnnouncementPlace::TWITTER                => 30,
        ];
    }
}
