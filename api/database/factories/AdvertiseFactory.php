<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Enum\Property\AdvertiseProperty;
use App\Models\Advertise;
use Faker\Generator as Faker;

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

$factory->define(Advertise::class, function (Faker $faker) {
    return [
        AdvertiseProperty::title => 'みやメシ応援隊',
        AdvertiseProperty::link => 'https://ulab-uu.com',
    ];
});
