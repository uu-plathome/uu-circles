<?php

namespace App\Models;

use App\Enum\CircleNewJoyModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class CircleNewJoy extends Model
{
    protected $fillable = [
        CircleNewJoyModel::circle_id,
        CircleNewJoyModel::title,
        CircleNewJoyModel::description,
        CircleNewJoyModel::url,
        CircleNewJoyModel::place_of_activity,
        CircleNewJoyModel::place_of_activity_detail,
        CircleNewJoyModel::publish_from,
        CircleNewJoyModel::start_date,
        CircleNewJoyModel::end_date,
        CircleNewJoyModel::release,
    ];


    protected $casts = [
        CircleNewJoyModel::publish_from => 'datetime:Y-m-d',
        CircleNewJoyModel::start_date   => 'datetime:Y-m-d H:i',
        CircleNewJoyModel::end_date     => 'datetime:Y-m-d H:i',
        CircleNewJoyModel::release      => 'boolean',
    ];

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
                    $query->where(CircleNewJoyModel::publish_from, '<=', $now);
                })->orWhere(function ($query) {
                    $query->whereNull(CircleNewJoyModel::publish_from);
                });
            });
    }
}
