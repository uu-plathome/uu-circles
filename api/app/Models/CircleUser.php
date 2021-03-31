<?php

namespace App\Models;

use App\Enum\Property\CircleUserProperty;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CircleUser extends Model
{
    protected $fillable = [
        CircleUserProperty::circle_id,
        CircleUserProperty::user_id,
        CircleUserProperty::role
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
