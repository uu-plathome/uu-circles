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
        CircleNewJoyModel::publish_to,
        CircleNewJoyModel::start_date,
        CircleNewJoyModel::end_date,
        CircleNewJoyModel::release,
    ];

    protected $dates = [
        CircleNewJoyModel::start_date,
        CircleNewJoyModel::end_date,
        CircleNewJoyModel::publish_from,
        CircleNewJoyModel::publish_to,
    ];

    protected $casts = [
        CircleNewJoyModel::release => 'boolean',
    ];

    /**
     * 現在公開中かどうか
     *
     * @param boolean $release
     * @param Carbon|null $publish_from
     * @param Carbon|null $publish_to
     * @param Carbon $now
     * @return boolean
     */
    public static function getNowPublic(
        bool $release,
        ?Carbon $publish_from,
        ?Carbon $publish_to,
        Carbon $now
    ): bool {
        if (!$release) {
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

        if ($publish_to && $publish_to->gt($now) && $publish_to && $publish_from->lt($now)) {
            return true;
        }

        return false;
    }

    /**
     * 現在公開中かどうか
     *
     * @return boolean
     */
    public function getNowPublicAttibute(): bool
    {
        $now = Carbon::now();
        return self::getNowPublic(
            $this->release,
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
        return $query->whereRelease(true)
            ->where(function ($query) use ($now) {
                $query->where(function ($query) use ($now) {
                    $query->where(CircleNewJoyModel::publish_from, '<', $now)
                        ->where(CircleNewJoyModel::publish_to, '>', $now);
                })
                ->orWhere(function($query) use($now) {
                    $query->where(CircleNewJoyModel::publish_from, '<', $now)
                        ->whereNull(CircleNewJoyModel::publish_to);
                })
                ->orWhere(function($query) use($now) {
                    $query->where(CircleNewJoyModel::publish_to, '>', $now)
                        ->whereNull(CircleNewJoyModel::publish_from);
                })
                ->orWhere(function($query) {
                    $query->whereNull(CircleNewJoyModel::publish_from)
                        ->whereNull(CircleNewJoyModel::publish_to);
                });
            });
    }
}
