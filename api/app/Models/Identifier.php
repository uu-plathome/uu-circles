<?php

namespace App\Models;

use App\Enum\Property\IdentifierProperty as P;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Identifier extends Model
{
    protected $fillable = [
        P::identifier_hash,
    ];

    public function circleGachaResults(): HasMany
    {
        return $this->hasMany(CircleGachaResult::class);
    }
}
