<?php

namespace App\Models;

use App\Enum\Property\CircleSearchWordProperty as P;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CircleSearchWord extends Model
{
    use HasFactory;

    protected $fillable = [
        P::word,
    ];
}
