<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CircleHandbill extends Model
{
    protected $fillable = [
        'circle_id',
        'image_url',
        'year',
    ];
}
