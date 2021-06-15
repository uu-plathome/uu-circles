<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Enum\Property\UserProperty;
use App\Models\User;
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
        UserProperty::username          => 'tester',
        UserProperty::display_name      => 'tester',
        UserProperty::email             => $faker->email,
        UserProperty::email_verified_at => now(),
        UserProperty::password          => Hash::make('Test1234@@'), // password
        UserProperty::remember_token    => Str::random(10),
        UserProperty::api_token         => Str::random(60),
    ];
});

$factory->state(User::class, 'admin', function (Faker $faker) {
    return [
        UserProperty::username          => 'tester',
        UserProperty::display_name      => 'tester',
        UserProperty::email             => 'tester@example.com',
        UserProperty::email_verified_at => now(),
        UserProperty::password          => Hash::make('Test1234@@'), // password
        UserProperty::remember_token    => Str::random(10),
        UserProperty::api_token         => 'test1234',
    ];
});
