<?php

namespace App\Models;

use App\Enum\Property\IdentifierProperty as P;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Identifier extends Model
{
    protected $fillable = [
        P::identifier_hash,
    ];
}
