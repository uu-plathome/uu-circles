<?php

namespace App\Models;

use App\Enum\UserModel;
use App\Notifications\ResetPassword;
use App\Notifications\VerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

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
                ->whereHas('adminUser');
    }

    /**
     * Determine if the user has verified their email address.
     *
     * @return bool
     */
    public function hasVerifiedEmail()
    {
        return !is_null($this->email_verified_at) && $this->active;
    }

    /**
     * Mark the given user's email as verified.
     *
     * @return bool
     */
    public function markEmailAsVerified()
    {
        return $this->forceFill([
            'email_verified_at' => $this->freshTimestamp(),
        ])->save();
    }

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPassword($token));
    }

    /**
     * Send the email verification notification.
     *
     * @return void
     */
    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmail);
    }

    public function adminUser(): HasOne
    {
        return $this->hasOne(AdminUser::class);
    }
}
