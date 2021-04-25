<?php

namespace App\Models;

use App\Enum\Property\AdvertiseCounterHistoryProperty as P;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdvertiseCounterHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        P::advertise_id,
        P::link,
        P::count,
        P::date,
    ];
}
