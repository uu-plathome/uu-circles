<?php

namespace App\Models;

use App\Enum\Property\AdminUserProperty as P;
use App\Enum\Role;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AdminUser extends Model
{
    protected $fillable = [
        P::user_id,
        P::role,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isSystem(): bool
    {
        return $this->role === Role::SYSTEM;
    }

    public function isManager(): bool
    {
        return $this->role === Role::MANAGER || $this->role === Role::SYSTEM;
    }
}
