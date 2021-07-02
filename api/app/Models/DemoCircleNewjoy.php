<?php

namespace App\Models;

use App\Enum\Property\DemoCircleNewJoyProperty as P;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DemoCircleNewjoy extends Model
{
    use HasFactory;

    protected $fillable = [
        P::circle_id,
        P::title,
        P::description,
        P::url,
        P::place_of_activity,
        P::place_of_activity_detail,
        P::demo_circle_newjoy_type,
        P::start_date,
        P::end_date,
        P::published,
    ];

    protected $casts = [
        P::start_date   => 'datetime:Y-m-d H:i',
        P::end_date     => 'datetime:Y-m-d H:i',
        P::published    => 'boolean',
    ];

    public function circle(): BelongsTo
    {
        return $this->belongsTo(Circle::class);
    }
}
