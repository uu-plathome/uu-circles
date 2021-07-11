<?php

namespace App\Models;

use App\Enum\Property\CirclePageViewProperty;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CirclePageView extends Model
{
    use HasFactory;

    protected $fillable = [
        CirclePageViewProperty::circle_id,
        CirclePageViewProperty::slug,
        CirclePageViewProperty::page_views,
        CirclePageViewProperty::active_users,
    ];

    public function circle(): BelongsTo
    {
        return $this->belongsTo(Circle::class);
    }
}
