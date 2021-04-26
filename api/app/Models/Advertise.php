<?php

namespace App\Models;

use App\Enum\Property\AdvertiseProperty as P;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

class Advertise extends Model
{
    use SoftDeletes;

    protected $fillable = [
        P::title,
        P::link,
        P::main_image_url,
        P::slug,
        P::active,
        P::advertise_type,
        P::publish_to,
        P::publish_from,
    ];

    protected $casts = [
        P::active       => 'boolean',
        P::publish_to   => 'datetime:Y-m-d',
        P::publish_from => 'datetime:Y-m-d',
    ];

    protected $dates = [
        P::deleted_at
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
