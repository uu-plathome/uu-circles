<?php

namespace App\Models;

use App\Enum\Property\CircleHandbillProperty as P;
use Illuminate\Database\Eloquent\Model;

class CircleHandbill extends Model
{
    protected $fillable = [
        P::circle_id,
        P::image_url,
        P::year,
    ];
}
