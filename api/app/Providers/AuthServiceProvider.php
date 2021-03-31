<?php

namespace App\Providers;

use App\Auth\AdminUserTokenGuard;
use App\Auth\CircleUserTokenGuard;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Auth::extend('adminUserGuard', function ($app, $name, array $config) {
            return new AdminUserTokenGuard(Auth::createUserProvider($config['provider']), $app['request']);
        });

        Auth::extend('circleUserGuard', function ($app, $name, array $config) {
            return new CircleUserTokenGuard(Auth::createUserProvider($config['provider']), $app['request']);
        });
    }
}
