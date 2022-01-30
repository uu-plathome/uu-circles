<?php

namespace App\Models;

use App\Enum\Property\CircleInvitationProperty as P;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CircleInvitation extends Model
{
    protected $fillable = [
        P::circle_id,
        P::token,
        P::active,
        P::created_user_id,
    ];

    protected $casts = [
        P::active => 'boolean',
    ];

    public static function generateToken(): string
    {
        return base64_encode(Str::uuid()->toString());
    }
}
