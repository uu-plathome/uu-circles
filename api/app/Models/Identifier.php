<?php

namespace App\Models;

use App\Enum\Property\IdentifierProperty as P;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Identifier extends Model
{
    use HasFactory;

    protected $fillable = [
        P::identifier_hash,
    ];

    /**
     * UUIDをハッシュ.
     *
     * @return string
     */
    public static function generateIdentifierHash(): string
    {
        $uuid = Str::uuid()->toString();

        return base64_encode($uuid);
    }

    public function circleGachaResults(): HasMany
    {
        return $this->hasMany(CircleGachaResult::class);
    }

    public function identifierHistory(): HasMany
    {
        return $this->hasMany(IdentifierHistory::class);
    }
}
