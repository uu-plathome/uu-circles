<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CircleUser extends Model
{
    protected $fillable = [
        'circle_id',
        'user_id',
    ] ;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
