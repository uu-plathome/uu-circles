<?php

namespace App\Models;

use App\Enum\Property\PageViewProperty;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageView extends Model
{
    use HasFactory;

    protected $fillable = [
        PageViewProperty::url,
        PageViewProperty::page_views,
        PageViewProperty::active_users,
    ];
}
