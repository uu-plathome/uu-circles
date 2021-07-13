<?php

namespace App\Models;

use App\Enum\Property\CircleGachaPickupProperty;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CircleGachaPickup extends Model
{
    use HasFactory;
    
    protected $fillable = [
        CircleGachaPickupProperty::circle_id1,
        CircleGachaPickupProperty::circle_id2,
        CircleGachaPickupProperty::circle_id3,
    ];
}
