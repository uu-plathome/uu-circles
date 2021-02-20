<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Enum\CircleModel;
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
        CircleModel::slug    => Str::random(20),
        CircleModel::release => true,
    ];
});

$factory->state(Circle::class, '非公開', function (Faker $faker) {
    return [
        CircleModel::slug    => Str::random(20),
        CircleModel::release => false,
    ];
});
