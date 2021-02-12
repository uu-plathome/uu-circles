<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CircleTag extends Model
{
    protected $fillable = [
        'nature',
        'volunteer',
        'international',
        'incare',
        'loose',
        'community',
        'programming',
        'urgent_recruitment',
        'mystery',
    ];

    protected $casts = [
        'nature'             => 'boolean',
        'volunteer'          => 'boolean',
        'international'      => 'boolean',
        'incare'             => 'boolean',
        'loose'              => 'boolean',
        'community'          => 'boolean',
        'programming'        => 'boolean',
        'urgent_recruitment' => 'boolean',
        'mystery'            => 'boolean',
    ];
}
