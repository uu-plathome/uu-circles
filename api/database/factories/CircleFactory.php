<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Enum\Property\CircleProperty;
use App\Models\Circle;
use Faker\Generator as Faker;
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

$factory->define(Circle::class, function (Faker $faker) {
    return [
        CircleProperty::name    => 'U-lab',
        CircleProperty::slug    => Str::random(20),
        CircleProperty::release => true,
    ];
});

$factory->state(Circle::class, '非公開', function (Faker $faker) {
    return [
        CircleProperty::name    => 'U-lab',
        CircleProperty::slug    => Str::random(20),
        CircleProperty::release => false,
    ];
});
