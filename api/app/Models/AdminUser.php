<?php

namespace App\Models;

use App\Enum\Property\AdminUserProperty;
use App\Enum\Role;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AdminUser extends Model
{
    protected $fillable = [
        AdminUserProperty::user_id,
        AdminUserProperty::role,
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
