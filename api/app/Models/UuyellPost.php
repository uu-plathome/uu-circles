<?php

namespace App\Models;

use App\Enum\Property\UuyellPostProperty as P;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UuyellPost extends Model
{
    use HasFactory;

    protected $fillable = [
        P::wordpress_id,
        P::title,
        P::slug,
        P::link,
        P::date,
        P::featured_media,
        P::media_source_url,
        P::media_alt_text,
        P::published,
        P::can_repost,
        P::tweet_id,
        P::notified_at,
    ];

    protected $casts = [
        P::published  => 'boolean',
        P::can_repost => 'boolean',
    ];
}
