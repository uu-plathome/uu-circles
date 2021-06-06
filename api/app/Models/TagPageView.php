<?php

namespace App\Models;

use App\Enum\Property\TagPageViewProperty;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TagPageView extends Model
{
    use HasFactory;

    protected $fillable = [
        TagPageViewProperty::tag_name,
        TagPageViewProperty::active_users,
        TagPageViewProperty::page_views,
    ];
}
