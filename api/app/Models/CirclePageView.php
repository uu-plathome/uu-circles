<?php

namespace App\Models;

use App\Enum\Property\CirclePageViewProperty;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CirclePageView extends Model
{
    use HasFactory;

    protected $fillable = [
        CirclePageViewProperty::circle_id,
        CirclePageViewProperty::slug,
        CirclePageViewProperty::page_views,
        CirclePageViewProperty::active_users,
    ];
}
