<?php

namespace App\Models;

use App\Enum\Property\CircleInformationProperty;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CircleInformation extends Model
{
    protected $fillable = [
        CircleInformationProperty::circle_id,
        CircleInformationProperty::circle_type,
        CircleInformationProperty::name_kana,
        CircleInformationProperty::short_name,
        CircleInformationProperty::prefix_name,
        CircleInformationProperty::description,
        CircleInformationProperty::common_place_of_activity,
        CircleInformationProperty::common_place_of_activity_detail,
        CircleInformationProperty::common_date_of_activity_monday,
        CircleInformationProperty::common_date_of_activity_tuesday,
        CircleInformationProperty::common_date_of_activity_wednesday,
        CircleInformationProperty::common_date_of_activity_thursday,
        CircleInformationProperty::common_date_of_activity_friday,
        CircleInformationProperty::common_date_of_activity_saturday,
        CircleInformationProperty::common_date_of_activity_sunday,
        CircleInformationProperty::common_date_of_activity_detail,
        CircleInformationProperty::is_online_activity,
        CircleInformationProperty::online_place_of_activity_detail,
        CircleInformationProperty::online_date_of_activity_monday,
        CircleInformationProperty::online_date_of_activity_tuesday,
        CircleInformationProperty::online_date_of_activity_wednesday,
        CircleInformationProperty::online_date_of_activity_thursday,
        CircleInformationProperty::online_date_of_activity_friday,
        CircleInformationProperty::online_date_of_activity_saturday,
        CircleInformationProperty::online_date_of_activity_sunday,
        CircleInformationProperty::online_date_of_activity_detail,
        CircleInformationProperty::admission_fee_per_year,
        CircleInformationProperty::is_club_activities,
        CircleInformationProperty::appealing_point1,
        CircleInformationProperty::appealing_point2,
        CircleInformationProperty::appealing_point3,
        CircleInformationProperty::number_of_members,
        CircleInformationProperty::public_email,
        CircleInformationProperty::twitter_url,
        CircleInformationProperty::facebook_url,
        CircleInformationProperty::instagram_url,
        CircleInformationProperty::line_url,
        CircleInformationProperty::youtube_url,
        CircleInformationProperty::homepage_url,
        CircleInformationProperty::peing_url,
        CircleInformationProperty::github_url,
        CircleInformationProperty::tiktok_url,
        CircleInformationProperty::participation_url,
        CircleInformationProperty::main_image_url,
        CircleInformationProperty::activity_image_url1,
        CircleInformationProperty::activity_image_url2,
        CircleInformationProperty::activity_image_url3,
        CircleInformationProperty::activity_image_url4,
        CircleInformationProperty::activity_image_url5,
        CircleInformationProperty::activity_image_url6,
    ];

    protected $casts = [
        CircleInformationProperty::common_date_of_activity_monday     => 'boolean',
        CircleInformationProperty::common_date_of_activity_tuesday    => 'boolean',
        CircleInformationProperty::common_date_of_activity_wednesday  => 'boolean',
        CircleInformationProperty::common_date_of_activity_thursday   => 'boolean',
        CircleInformationProperty::common_date_of_activity_friday     => 'boolean',
        CircleInformationProperty::common_date_of_activity_saturday   => 'boolean',
        CircleInformationProperty::common_date_of_activity_sunday     => 'boolean',
        CircleInformationProperty::is_online_activity                 => 'boolean',
        CircleInformationProperty::online_date_of_activity_monday     => 'boolean',
        CircleInformationProperty::online_date_of_activity_tuesday    => 'boolean',
        CircleInformationProperty::online_date_of_activity_wednesday  => 'boolean',
        CircleInformationProperty::online_date_of_activity_thursday   => 'boolean',
        CircleInformationProperty::online_date_of_activity_friday     => 'boolean',
        CircleInformationProperty::online_date_of_activity_saturday   => 'boolean',
        CircleInformationProperty::online_date_of_activity_sunday     => 'boolean',
        CircleInformationProperty::is_club_activities                 => 'boolean',
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

    public function scopeWhereMammoth($query)
    {
        return $query->where('number_of_members', '>', 49);
    }

    /**
     * 活動日数が週に5日以上
     *
     * @param mixed $query
     * @return void
     */
    public function scopeWhereActiveActivity($query)
    {
        return $query->where(function ($query) {
            $query->where(function ($query) {
                $query->whereRaw('(
                    common_date_of_activity_monday +
                    common_date_of_activity_tuesday +
                    common_date_of_activity_wednesday +
                    common_date_of_activity_thursday +
                    common_date_of_activity_friday +
                    common_date_of_activity_saturday +
                    common_date_of_activity_sunday
                ) > 4');
            })->orWhere(function ($query) {
                $query->whereRaw('(
                    online_date_of_activity_monday +
                    online_date_of_activity_tuesday +
                    online_date_of_activity_wednesday +
                    online_date_of_activity_thursday +
                    online_date_of_activity_friday +
                    online_date_of_activity_saturday +
                    online_date_of_activity_sunday
                ) > 4');
            });
        });
    }

    public function scopeWhereOnlyMonday($query)
    {
        return $query->where(function ($query) {
            /** @var CircleInformation $query */
            $query->where(function ($query) {
                /** @var CircleInformation $query */
                $query->where(CircleInformationProperty::common_date_of_activity_monday, true)
                    ->orWhere(CircleInformationProperty::online_date_of_activity_monday, true);
            })->whereCommonDateOfActivityTuesday(false)
                ->whereCommonDateOfActivityWednesday(false)
                ->whereCommonDateOfActivityThursday(false)
                ->whereCommonDateOfActivityFriday(false)
                ->whereCommonDateOfActivitySaturday(false)
                ->whereCommonDateOfActivitySunday(false)
                ->whereOnlineDateOfActivityTuesday(false)
                ->whereOnlineDateOfActivityWednesday(false)
                ->whereOnlineDateOfActivityThursday(false)
                ->whereOnlineDateOfActivityFriday(false)
                ->whereOnlineDateOfActivitySaturday(false)
                ->whereOnlineDateOfActivitySunday(false);
        });
    }

    public function scopeWhereOnlyTuesday($query)
    {
        return $query->where(function ($query) {
            /** @var CircleInformation $query */
            $query->where(function ($query) {
                /** @var CircleInformation $query */
                $query->where(CircleInformationProperty::common_date_of_activity_tuesday, true)
                    ->orWhere(CircleInformationProperty::online_date_of_activity_tuesday, true);
            })->whereCommonDateOfActivityMonday(false)
                ->whereCommonDateOfActivityWednesday(false)
                ->whereCommonDateOfActivityThursday(false)
                ->whereCommonDateOfActivityFriday(false)
                ->whereCommonDateOfActivitySaturday(false)
                ->whereCommonDateOfActivitySunday(false)
                ->whereOnlineDateOfActivityMonday(false)
                ->whereOnlineDateOfActivityWednesday(false)
                ->whereOnlineDateOfActivityThursday(false)
                ->whereOnlineDateOfActivityFriday(false)
                ->whereOnlineDateOfActivitySaturday(false)
                ->whereOnlineDateOfActivitySunday(false);
        });
    }

    public function scopeWhereOnlyWednesday($query)
    {
        return $query->where(function ($query) {
            /** @var CircleInformation $query */
            $query->where(function ($query) {
                /** @var CircleInformation $query */
                $query->where(CircleInformationProperty::common_date_of_activity_wednesday, true)
                    ->orWhere(CircleInformationProperty::online_date_of_activity_wednesday, true);
            })->whereCommonDateOfActivityMonday(false)
                ->whereCommonDateOfActivityTuesday(false)
                ->whereCommonDateOfActivityThursday(false)
                ->whereCommonDateOfActivityFriday(false)
                ->whereCommonDateOfActivitySaturday(false)
                ->whereCommonDateOfActivitySunday(false)
                ->whereOnlineDateOfActivityMonday(false)
                ->whereOnlineDateOfActivityTuesday(false)
                ->whereOnlineDateOfActivityThursday(false)
                ->whereOnlineDateOfActivityFriday(false)
                ->whereOnlineDateOfActivitySaturday(false)
                ->whereOnlineDateOfActivitySunday(false);
        });
    }

    public function scopeWhereOnlyThursday($query)
    {
        return $query->where(function ($query) {
            /** @var CircleInformation $query */
            $query->where(function ($query) {
                /** @var CircleInformation $query */
                $query->where(CircleInformationProperty::common_date_of_activity_thursday, true)
                    ->orWhere(CircleInformationProperty::online_date_of_activity_thursday, true);
            })->whereCommonDateOfActivityMonday(false)
                ->whereCommonDateOfActivityTuesday(false)
                ->whereCommonDateOfActivityWednesday(false)
                ->whereCommonDateOfActivityFriday(false)
                ->whereCommonDateOfActivitySaturday(false)
                ->whereCommonDateOfActivitySunday(false)
                ->whereOnlineDateOfActivityMonday(false)
                ->whereOnlineDateOfActivityTuesday(false)
                ->whereOnlineDateOfActivityWednesday(false)
                ->whereOnlineDateOfActivityFriday(false)
                ->whereOnlineDateOfActivitySaturday(false)
                ->whereOnlineDateOfActivitySunday(false);
        });
    }

    public function scopeWhereOnlyFriday($query)
    {
        return $query->where(function ($query) {
            /** @var CircleInformation $query */
            $query->where(function ($query) {
                /** @var CircleInformation $query */
                $query->where(CircleInformationProperty::common_date_of_activity_friday, true)
                    ->orWhere(CircleInformationProperty::online_date_of_activity_friday, true);
            })->whereCommonDateOfActivityMonday(false)
                ->whereCommonDateOfActivityTuesday(false)
                ->whereCommonDateOfActivityWednesday(false)
                ->whereCommonDateOfActivityThursday(false)
                ->whereCommonDateOfActivitySaturday(false)
                ->whereCommonDateOfActivitySunday(false)
                ->whereOnlineDateOfActivityMonday(false)
                ->whereOnlineDateOfActivityTuesday(false)
                ->whereOnlineDateOfActivityWednesday(false)
                ->whereOnlineDateOfActivityThursday(false)
                ->whereOnlineDateOfActivitySaturday(false)
                ->whereOnlineDateOfActivitySunday(false);
        });
    }
}
