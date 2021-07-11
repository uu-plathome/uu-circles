<?php

namespace App\Models;

use App\Enum\Property\CircleNewJoyProperty as P;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

class CircleNewJoy extends Model
{
    protected $fillable = [
        P::circle_id,
        P::title,
        P::description,
        P::url,
        P::place_of_activity,
        P::place_of_activity_detail,
        P::private_newjoy_link,
        P::publish_from,
        P::start_date,
        P::end_date,
        P::release,
    ];

    protected $casts = [
        P::publish_from => 'datetime:Y-m-d',
        P::start_date   => 'datetime:Y-m-d H:i',
        P::end_date     => 'datetime:Y-m-d H:i',
        P::release      => 'boolean',
    ];

    public function circle(): BelongsTo
    {
        return $this->belongsTo(Circle::class);
    }

    /**
     * 現在公開中かどうか.
     *
     * @param bool        $release
     * @param Carbon|null $publish_from
     * @param Carbon      $now
     *
     * @return bool
     */
    public static function getNowPublic(
        bool $release,
        ?Carbon $publish_from,
        Carbon $now
    ): bool {
        if (!$release) {
            return false;
        }

        if ($publish_from === null) {
            return true;
        }

        if ($publish_from && $publish_from->lt($now)) {
            return true;
        }

        return false;
    }

    /**
     * 現在公開中かどうか.
     *
     * @return bool
     */
    public function getNowPublicAttribute(): bool
    {
        $now = Carbon::now();

        return self::getNowPublic(
            $this->release,
            $this->publish_from,
            $now
        );
    }

    /**
     * 現在公開中のものを取得する.
     *
     * @param $query
     * @param Carbon $now
     *
     * @return void
     */
    public function scopeNowPublic($query, Carbon $now)
    {
        return $query->whereRelease(true)
            ->where(function ($query) use ($now) {
                $query->where(function ($query) use ($now) {
                    $query->where(P::publish_from, '<=', $now);
                })->orWhere(function ($query) {
                    $query->whereNull(P::publish_from);
                });
            });
    }
}
