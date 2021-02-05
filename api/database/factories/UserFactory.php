<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Enum\UserModel;
use App\Enum\UserTokenModel;
use App\Models\User;
use App\Models\UserToken;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    return [
        UserModel::username          => 'tester',
        UserModel::display_name      => 'tester',
        UserModel::email             => $faker->email,
        UserModel::email_verified_at => now(),
        UserModel::password          => Hash::make('Test1234@@'), // password
        UserModel::remember_token    => Str::random(10),
        UserModel::api_token         => 'test1234',
    ];
});

$factory->state(User::class, 'admin' , function (Faker $faker) {
    return [
        UserModel::username          => 'tester',
        UserModel::display_name      => 'tester',
        UserModel::email             => 'tester@example.com',
        UserModel::email_verified_at => now(),
        UserModel::password          => Hash::make('Test1234@@'), // password
        UserModel::remember_token    => Str::random(10),
        UserModel::api_token         => 'test1234',
    ];
});
