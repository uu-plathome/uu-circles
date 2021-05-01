<?php

namespace App\Models;

use App\Enum\Property\CircleGachaResultProperty as P;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CircleGachaResult extends Model
{
    protected $fillable = [
        P::gacha_hash,
        P::identifier_hash,
        P::result_circle_ids,
        P::pickup_circle_ids,
    ];
}
