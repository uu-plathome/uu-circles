<?php

namespace App\Models;

use App\Enum\CircleModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Circle extends Model
{
    protected $fillable = [
        CircleModel::slug,
        CircleModel::release,
    ];

    protected $casts = [
        CircleModel::release => 'boolean',
    ];

    public function circleInformation(): HasOne
    {
        return $this->hasOne(CircleInformation::class);
    }

    public function circleUsers(): HasMany
    {
        return $this->hasMany(CircleUser::class);
    }

    /**
     * ランダムなSlugを生成する
     *
     * @return void
     */
    public function createSlugWhenSlugNotExist()
    {
        $this->slug ??= Str::random(16);
    }

    public function circleInvitation(): HasMany
    {
        return $this->hasMany(CircleInvitation::class);
    }

    /**
     * 新歓を取得する
     *
     * @return HasMany
     */
    public function circleNewJoys(): HasMany
    {
        return $this->hasMany(CircleNewJoy::class);
    }

    /**
     * 新歓ビラ
     *
     * @return HasOne
     */
    public function circleHandbill(): HasOne
    {
        return $this->hasOne(CircleHandbill::class);
    }

    /**
     * サークルタグ
     *
     * @return HasOne
     */
    public function circleTag(): HasOne
    {
        return $this->hasOne(CircleTag::class);
    }

    /**
     * 現在公開中の新歓を取得する
     *
     * @return void
     */
    public function nowPublicCircleNewJoys()
    {
        return $this->circleNewJoys()->nowPublic();
    }
}
