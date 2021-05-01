<?php

namespace App\Models;

use App\Enum\Property\IdentifierHistoryProperty as P;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IdentifierHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        P::identifier_id,
        P::user_agent,
        P::ip_address,
        P::count,
    ];
}
