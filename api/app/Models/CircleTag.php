<?php

namespace App\Models;

use App\Enum\Property\CircleTagProperty as P;
use Illuminate\Database\Eloquent\Model;

class CircleTag extends Model
{
    protected $fillable = [
        P::sport,
        P::music,
        P::culture,
        P::nature,
        P::volunteer,
        P::international,
        P::incare,
        P::loose,
        P::community,
        P::programming,
        P::urgent_recruitment,
        P::mystery,
    ];

    protected $casts = [
        P::sport              => 'boolean',
        P::music              => 'boolean',
        P::culture            => 'boolean',
        P::nature             => 'boolean',
        P::volunteer          => 'boolean',
        P::international      => 'boolean',
        P::incare             => 'boolean',
        P::loose              => 'boolean',
        P::community          => 'boolean',
        P::programming        => 'boolean',
        P::urgent_recruitment => 'boolean',
        P::mystery            => 'boolean',
    ];
}
