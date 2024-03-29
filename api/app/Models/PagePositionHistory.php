<?php

namespace App\Models;

use App\Enum\Property\PagePositionHistoryProperty;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PagePositionHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        PagePositionHistoryProperty::identifier_id,
        PagePositionHistoryProperty::page_name,
        PagePositionHistoryProperty::page_url,
        PagePositionHistoryProperty::page_position_id,
        PagePositionHistoryProperty::circle_id,
        PagePositionHistoryProperty::screen_width,
        PagePositionHistoryProperty::screen_height,
    ];

    public function identifier(): BelongsTo
    {
        return $this->belongsTo(Identifier::class);
    }

    public function circle(): BelongsTo
    {
        return $this->belongsTo(Circle::class);
    }
}
