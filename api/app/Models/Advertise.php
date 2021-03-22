<?php

namespace App\Models;

use App\Enum\Property\AdvertiseProperty;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Advertise extends Model
{
    protected $fillable = [
        AdvertiseProperty::title,
        AdvertiseProperty::link,
        AdvertiseProperty::main_image_url,
        AdvertiseProperty::active,
        AdvertiseProperty::advertise_type,
        AdvertiseProperty::publish_to,
        AdvertiseProperty::publish_from,
    ];

    protected $casts = [
        AdvertiseProperty::active       => 'boolean',
        AdvertiseProperty::publish_to   => 'datetime:Y-m-d',
        AdvertiseProperty::publish_from => 'datetime:Y-m-d',
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
                    $query->where(AdvertiseProperty::publish_from, '<', $now)
                        ->where(AdvertiseProperty::publish_to, '>', $now);
                })
                    ->orWhere(function ($query) use ($now) {
                        $query->where(AdvertiseProperty::publish_from, '<', $now)
                            ->whereNull(AdvertiseProperty::publish_to);
                    })
                    ->orWhere(function ($query) use ($now) {
                        $query->where(AdvertiseProperty::publish_to, '>', $now)
                            ->whereNull(AdvertiseProperty::publish_from);
                    })
                    ->orWhere(function ($query) {
                        $query->whereNull(AdvertiseProperty::publish_from)
                            ->whereNull(AdvertiseProperty::publish_to);
                    });
            });
    }
}
