<?php

namespace App\Models;

use App\Enum\Property\CircleInformationProperty as P;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CircleInformation extends Model
{
    protected $fillable = [
        P::circle_id,
        P::circle_type,
        P::name_kana,
        P::short_name,
        P::prefix_name,
        P::description,
        P::common_place_of_activity,
        P::common_place_of_activity_detail,
        P::common_date_of_activity_monday,
        P::common_date_of_activity_tuesday,
        P::common_date_of_activity_wednesday,
        P::common_date_of_activity_thursday,
        P::common_date_of_activity_friday,
        P::common_date_of_activity_saturday,
        P::common_date_of_activity_sunday,
        P::common_date_of_activity_detail,
        P::is_online_activity,
        P::online_place_of_activity_detail,
        P::online_date_of_activity_monday,
        P::online_date_of_activity_tuesday,
        P::online_date_of_activity_wednesday,
        P::online_date_of_activity_thursday,
        P::online_date_of_activity_friday,
        P::online_date_of_activity_saturday,
        P::online_date_of_activity_sunday,
        P::online_date_of_activity_detail,
        P::admission_fee_per_year,
        P::is_club_activities,
        P::appealing_point1,
        P::appealing_point2,
        P::appealing_point3,
        P::number_of_members,
        P::public_email,
        P::twitter_url,
        P::facebook_url,
        P::instagram_url,
        P::line_url,
        P::youtube_url,
        P::homepage_url,
        P::peing_url,
        P::github_url,
        P::tiktok_url,
        P::participation_url,
        P::main_image_url,
        P::activity_image_url1,
        P::activity_image_url2,
        P::activity_image_url3,
        P::activity_image_url4,
        P::activity_image_url5,
        P::activity_image_url6,
        P::wp_url,
        P::wp_tag_taxonomy,
        P::is_view_wp_post,
    ];

    protected $casts = [
        P::common_date_of_activity_monday     => 'boolean',
        P::common_date_of_activity_tuesday    => 'boolean',
        P::common_date_of_activity_wednesday  => 'boolean',
        P::common_date_of_activity_thursday   => 'boolean',
        P::common_date_of_activity_friday     => 'boolean',
        P::common_date_of_activity_saturday   => 'boolean',
        P::common_date_of_activity_sunday     => 'boolean',
        P::is_online_activity                 => 'boolean',
        P::online_date_of_activity_monday     => 'boolean',
        P::online_date_of_activity_tuesday    => 'boolean',
        P::online_date_of_activity_wednesday  => 'boolean',
        P::online_date_of_activity_thursday   => 'boolean',
        P::online_date_of_activity_friday     => 'boolean',
        P::online_date_of_activity_saturday   => 'boolean',
        P::online_date_of_activity_sunday     => 'boolean',
        P::is_club_activities                 => 'boolean',
        P::is_view_wp_post                    => 'boolean',
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
     * カタカナに強制変換
     *
     * @param  string  $value
     * @return void
     */
    public function setNameKanaAttribute($value)
    {
        $this->attributes['name_kana'] = mb_convert_kana($value, "KVC");
    }

    /**
     * WordPressのURLの末尾のスラッシュを必ず削除
     *
     * @param $value
     */
    public function setWpUrlAttribute($value)
    {
        $this->attributes['wp_url'] = rtrim($value, '/');
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
                $query->where(P::common_date_of_activity_monday, true)
                    ->orWhere(P::online_date_of_activity_monday, true);
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
                $query->where(P::common_date_of_activity_tuesday, true)
                    ->orWhere(P::online_date_of_activity_tuesday, true);
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
                $query->where(P::common_date_of_activity_wednesday, true)
                    ->orWhere(P::online_date_of_activity_wednesday, true);
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
                $query->where(P::common_date_of_activity_thursday, true)
                    ->orWhere(P::online_date_of_activity_thursday, true);
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
                $query->where(P::common_date_of_activity_friday, true)
                    ->orWhere(P::online_date_of_activity_friday, true);
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
