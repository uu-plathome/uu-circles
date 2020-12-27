<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Circle extends Model
{
    protected $fillable = [
        'slug',
        'release',
    ];

    public function circleUsers(): HasMany
    {
        return $this->hasMany(CircleUser::class);
    }

    public function createSlugWhenSlugNotExist()
    {
        $this->slug ??= Str::random(16);
    }
}
