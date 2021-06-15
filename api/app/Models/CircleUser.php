<?php

namespace App\Models;

use App\Enum\Property\CircleUserProperty as P;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CircleUser extends Model
{
    protected $fillable = [
        P::circle_id,
        P::user_id,
        P::role,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function circle(): BelongsTo
    {
        return $this->belongsTo(Circle::class);
    }
}
