<?php

namespace App\Models;

use App\Enum\Property\CircleNewJoyProperty;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

class CircleNewJoy extends Model
{
    protected $fillable = [
        CircleNewJoyProperty::circle_id,
        CircleNewJoyProperty::title,
        CircleNewJoyProperty::description,
        CircleNewJoyProperty::url,
        CircleNewJoyProperty::place_of_activity,
        CircleNewJoyProperty::place_of_activity_detail,
        CircleNewJoyProperty::publish_from,
        CircleNewJoyProperty::start_date,
        CircleNewJoyProperty::end_date,
        CircleNewJoyProperty::release,
    ];


    protected $casts = [
        CircleNewJoyProperty::publish_from => 'datetime:Y-m-d',
        CircleNewJoyProperty::start_date   => 'datetime:Y-m-d H:i',
        CircleNewJoyProperty::end_date     => 'datetime:Y-m-d H:i',
        CircleNewJoyProperty::release      => 'boolean',
    ];

    public function circle(): BelongsTo
    {
        return $this->belongsTo(Circle::class);
    }

    /**
     * 現在公開中かどうか
     *
     * @param boolean $release
     * @param Carbon|null $publish_from
     * @param Carbon $now
     * @return boolean
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
     * 現在公開中かどうか
     *
     * @return boolean
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
     * 現在公開中のものを取得する
     *
     * @param $query
     * @param Carbon $now
     * @return void
     */
    public function scopeNowPublic($query, Carbon $now)
    {
        return $query->whereRelease(true)
            ->where(function ($query) use ($now) {
                $query->where(function ($query) use ($now) {
                    $query->where(CircleNewJoyProperty::publish_from, '<=', $now);
                })->orWhere(function ($query) {
                    $query->whereNull(CircleNewJoyProperty::publish_from);
                });
            });
    }
}
