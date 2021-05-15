<?php

namespace App\Models;

use App\Enum\Property\AnnouncementCounterHistoryProperty as P;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnnouncementCounterHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        P::announcement_id,
        P::announcement_place,
        P::count,
        P::date,
    ];
}
