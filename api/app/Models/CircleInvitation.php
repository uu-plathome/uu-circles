<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CircleInvitation extends Model
{
    protected $fillable = [
        'circle_id',
        'token',
        'active',
        'created_user_id',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public static function generateToken(): string
    {
        return base64_encode(Str::uuid());
    }
}
