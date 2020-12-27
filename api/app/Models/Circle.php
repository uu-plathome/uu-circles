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

    public function circleInformation(): HasOne
    {
        return $this->hasOne(CircleInformation::class);
    }

    public function circleUsers(): HasMany
    {
        return $this->hasMany(CircleUser::class);
    }

    public function createSlugWhenSlugNotExist()
    {
        $this->slug ??= Str::random(16);
    }
}
