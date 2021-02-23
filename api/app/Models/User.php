<?php

namespace App\Models;

use App\Enum\UserModel;
use App\Notifications\ResetPasswordAdminUser;
use App\Notifications\VerifyEmailAdminUser;
use App\Notifications\VerifyEmailCircleUser;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class User extends Authenticatable implements MustVerifyEmail
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        UserModel::display_name,
        UserModel::username,
        UserModel::email,
        UserModel::password,
        UserModel::active,
        UserModel::api_token,
        UserModel::remember_token,
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        UserModel::password,
        UserModel::remember_token,
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        UserModel::active            => 'boolean',
        UserModel::email_verified_at => 'datetime',
    ];

    public function scopeWhereAdminUser($query)
    {
        /** @var User $query */
        return $query->with('adminUser')->hasByNonDependentSubquery('adminUser');
    }

    /**
     * 管理者としてLoginできるユーザーを絞り込む
     * @param $query
     * @return User|Builder|\Illuminate\Database\Query\Builder
     */
    public function scopeCanAdminLogin($query)
    {
        /** @var User $query */
        return $query->whereActive(true)
            ->whereNotNull(UserModel::email_verified_at)
            ->whereAdminUser();
    }

    /**
     * Determine if the user has verified their email address.
     *
     * @return bool
     */
    public function hasVerifiedEmail(): bool
    {
        return !is_null($this->email_verified_at) && $this->active;
    }

    /**
     * Mark the given user's email as verified.
     *
     * @param string $password
     * @return bool
     */
    public function markEmailAndPasswordAsVerified(string $password): bool
    {
        return $this->forceFill([
            'password'          => Hash::make($password),
            'email_verified_at' => $this->freshTimestamp(),
        ])->save();
    }

    /**
     * Send the password reset notification.
     *
     * @param string $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordAdminUser($token));
    }

    /**
     * Send the email verification notification.
     *
     * @return void
     */
    public function sendEmailVerificationAdminUserNotification()
    {
        $this->notify(new VerifyEmailAdminUser);
    }

    /**
     * Send the email verification notification.
     *
     * @return void
     */
    public function sendEmailVerificationCircleUserNotification()
    {
        $this->notify(new VerifyEmailCircleUser);
    }

    /**
     * 管理者かどうか
     *
     * @return bool
     */
    public function isAdminUser(): bool
    {
        return AdminUser::whereUserId($this->id)->exists();
    }

    /**
     * サークルUserかどうか
     *
     * @return bool
     */
    public function isCircleUser(): bool
    {
        return CircleUser::whereUserId($this->id)->exists();
    }

    public function adminUser(): HasOne
    {
        return $this->hasOne(AdminUser::class);
    }

    public function circleUser(): HasOne
    {
        return $this->hasOne(CircleUser::class);
    }

    public function createApiToken()
    {
        $this->api_token = Str::random(80);
    }

    public function createRememberToken()
    {
        $this->remember_token = Str::random(10);
    }
}
