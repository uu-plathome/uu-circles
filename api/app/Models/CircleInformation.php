<?php

namespace App\Models;

use App\Enum\CircleInformationModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CircleInformation extends Model
{
    protected $fillable = [
        CircleInformationModel::circle_id,
        CircleInformationModel::circle_type,
        CircleInformationModel::name,
        CircleInformationModel::name_kana,
        CircleInformationModel::short_name,
        CircleInformationModel::prefix_name,
        CircleInformationModel::description,
        CircleInformationModel::common_place_of_activity,
        CircleInformationModel::common_place_of_activity_detail,
        CircleInformationModel::common_date_of_activity_monday,
        CircleInformationModel::common_date_of_activity_tuesday,
        CircleInformationModel::common_date_of_activity_wednesday,
        CircleInformationModel::common_date_of_activity_thursday,
        CircleInformationModel::common_date_of_activity_friday,
        CircleInformationModel::common_date_of_activity_saturday,
        CircleInformationModel::common_date_of_activity_sunday,
        CircleInformationModel::common_date_of_activity_detail,
        CircleInformationModel::is_online_activity,
        CircleInformationModel::online_place_of_activity_detail,
        CircleInformationModel::online_date_of_activity_monday,
        CircleInformationModel::online_date_of_activity_tuesday,
        CircleInformationModel::online_date_of_activity_wednesday,
        CircleInformationModel::online_date_of_activity_thursday,
        CircleInformationModel::online_date_of_activity_friday,
        CircleInformationModel::online_date_of_activity_saturday,
        CircleInformationModel::online_date_of_activity_sunday,
        CircleInformationModel::online_date_of_activity_detail,
        CircleInformationModel::admission_fee_per_year,
        CircleInformationModel::is_club_activities,
        CircleInformationModel::appealing_point1,
        CircleInformationModel::appealing_point2,
        CircleInformationModel::appealing_point3,
        CircleInformationModel::number_of_members,
        CircleInformationModel::public_email,
        CircleInformationModel::twitter_url,
        CircleInformationModel::facebook_url,
        CircleInformationModel::instagram_url,
        CircleInformationModel::line_url,
        CircleInformationModel::youtube_url,
        CircleInformationModel::homepage_url,
        CircleInformationModel::peing_url,
        CircleInformationModel::github_url,
        CircleInformationModel::tiktok_url,
        CircleInformationModel::participation_url,
        CircleInformationModel::main_image_url,
        CircleInformationModel::activity_image_url1,
        CircleInformationModel::activity_image_url2,
        CircleInformationModel::activity_image_url3,
        CircleInformationModel::activity_image_url4,
        CircleInformationModel::activity_image_url5,
        CircleInformationModel::activity_image_url6,
    ];

    protected $casts = [
        CircleInformationModel::common_date_of_activity_monday     => 'boolean',
        CircleInformationModel::common_date_of_activity_tuesday    => 'boolean',
        CircleInformationModel::common_date_of_activity_wednesday  => 'boolean',
        CircleInformationModel::common_date_of_activity_thursday   => 'boolean',
        CircleInformationModel::common_date_of_activity_friday     => 'boolean',
        CircleInformationModel::common_date_of_activity_saturday   => 'boolean',
        CircleInformationModel::common_date_of_activity_sunday     => 'boolean',
        CircleInformationModel::is_online_activity                 => 'boolean',
        CircleInformationModel::online_date_of_activity_monday     => 'boolean',
        CircleInformationModel::online_date_of_activity_tuesday    => 'boolean',
        CircleInformationModel::online_date_of_activity_wednesday  => 'boolean',
        CircleInformationModel::online_date_of_activity_thursday   => 'boolean',
        CircleInformationModel::online_date_of_activity_friday     => 'boolean',
        CircleInformationModel::online_date_of_activity_saturday   => 'boolean',
        CircleInformationModel::online_date_of_activity_sunday     => 'boolean',
        CircleInformationModel::is_club_activities                 => 'boolean',
    ];

    protected $appends = [
        'mammoth',
        'activeActivity',
    ];

    public function circle(): BelongsTo
    {
        return $this->belongsTo(Circle::class);
    }

    /**
     * 週の活動日数
     *
     * @return integer
     */
    public function weeklyActivityDays(): int
    {
        $count = 0;

        if ($this->common_date_of_activity_monday || $this->online_date_of_activity_monday) {
            $count++;
        }

        if ($this->common_date_of_activity_tuesday || $this->online_date_of_activity_tuesday) {
            $count++;
        }

        if ($this->common_date_of_activity_wednesday || $this->online_date_of_activity_wednesday) {
            $count++;
        }

        if ($this->common_date_of_activity_thursday || $this->online_date_of_activity_thursday) {
            $count++;
        }

        if ($this->common_date_of_activity_friday || $this->online_date_of_activity_friday) {
            $count++;
        }

        if ($this->common_date_of_activity_saturday || $this->online_date_of_activity_saturday) {
            $count++;
        }

        if ($this->common_date_of_activity_sunday || $this->online_date_of_activity_sunday) {
            $count++;
        }

        return $count;
    }

    /**
     * 週5以上
     */
    public function getActiveActivityAttribute(): bool
    {
        return $this->weeklyActivityDays() > 4;
    }

    /**
     * マンモス団体かどうか
     */
    public function getMammothAttribute(): bool
    {
        if (!$this->number_of_members) {
            return false;
        }

        return $this->number_of_members > 49;
    }
}
