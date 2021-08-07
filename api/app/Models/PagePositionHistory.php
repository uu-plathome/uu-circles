<?php

namespace App\Models;

use App\Enum\Property\PagePositionHistoryProperty;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PagePositionHistory extends Model
{
    use HasFactory;
    
    protected $fillable = [
        PagePositionHistoryProperty::identifier_id,
        PagePositionHistoryProperty::page_url,
        PagePositionHistoryProperty::page_position_id,
    ];
}
