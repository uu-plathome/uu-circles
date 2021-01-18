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
     * 現在公開中の新歓を取得する
     *
     * @return void
     */
    public function nowPublicCircleNewJoys()
    {
        return $this->circleNewJoys()->nowPublic();
    }
}
