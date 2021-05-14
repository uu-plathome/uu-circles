<?php

namespace App\Models;

use App\Enum\Property\AnnouncementProperty as P;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

class Announcement extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        P::title,
        P::description,
        P::link,
        P::announcement_type,
        P::importance,
        P::for_main_view,
        P::for_circle_mail,
        P::for_admin_view,
        P::for_admin_mail,
        P::for_newjoy_discord,
        P::active,
        P::is_main_view_fixed,
        P::is_circle_view_fixed,
        P::is_admin_view_fixed,
        P::notification_time,
        P::notified_at,
        P::publish_from,
        P::publish_to,
    ];

    protected $casts = [
        P::for_main_view        => 'boolean',
        P::for_circle_mail      => 'boolean',
        P::for_admin_view       => 'boolean',
        P::for_admin_mail       => 'boolean',
        P::for_newjoy_discord   => 'boolean',
        P::active               => 'boolean',
        P::is_main_view_fixed   => 'boolean',
        P::is_circle_view_fixed => 'boolean',
        P::is_admin_view_fixed  => 'boolean',
        P::notification_time  => 'datetime:Y-m-d H:i',
        P::publish_from       => 'datetime:Y-m-d H:i',
        P::publish_to         => 'datetime:Y-m-d H:i',
    ];

    protected $dates = [
        P::deleted_at,
    ];

    /**
     * 現在公開中かどうか
     *
     * @param boolean $active
     * @param Carbon|null $publish_from
     * @param Carbon|null $publish_to
     * @param Carbon $now
     * @return boolean
     */
    public static function getNowPublic(
        ?bool $active,
        ?Carbon $publish_from,
        ?Carbon $publish_to,
        Carbon $now
    ): bool {
        if (!$active) {
            return false;
        }

        if ($publish_from === null && $publish_to === null) {
            return true;
        }

        if ($publish_from && $publish_from->lt($now) && $publish_to === null) {
            return true;
        }

        if ($publish_to && $publish_to->gt($now) && $publish_from === null) {
            return true;
        }

        if ($publish_to && $publish_to->gt($now) && $publish_from && $publish_from->lt($now)) {
            return true;
        }

        return false;
    }

    /**
     * 現在公開中かどうか
     *
     * @return boolean
     */
    public function getNowPublicAttribute(): bool
    {
        $now = Carbon::now();
        return self::getNowPublic(
            $this->active,
            $this->publish_from,
            $this->publish_to,
            $now
        );
    }

    /**
     * 現在公開中のものを取得する
     *
     * @param $query
     * @param Carbon $now
     * @return void
     */
    public function scopeNowPublic($query, Carbon $now)
    {
        return $query->whereActive(true)
            ->where(function ($query) use ($now) {
                $query->where(function ($query) use ($now) {
                    $query->where(P::publish_from, '<', $now)
                        ->where(P::publish_to, '>', $now);
                })
                    ->orWhere(function ($query) use ($now) {
                        $query->where(P::publish_from, '<', $now)
                            ->whereNull(P::publish_to);
                    })
                    ->orWhere(function ($query) use ($now) {
                        $query->where(P::publish_to, '>', $now)
                            ->whereNull(P::publish_from);
                    })
                    ->orWhere(function ($query) {
                        $query->whereNull(P::publish_from)
                            ->whereNull(P::publish_to);
                    });
            });
    }
}
