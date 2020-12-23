<?php

namespace App\Models;

use App\Enum\AdminUserModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AdminUser extends Model
{
    protected $fillable = [
        AdminUserModel::user_id
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
