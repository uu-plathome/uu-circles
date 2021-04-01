<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Enum\CircleType;
use App\Enum\PlaceOfActivity;
use App\Enum\Property\CircleNewJoyProperty;
use App\Models\CircleNewJoy;
use Faker\Generator as Faker;
use Illuminate\Support\Carbon;

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

$factory->define(CircleNewJoy::class, function (Faker $faker) {
    return [
        CircleNewJoyProperty::title             => '交流会',
        CircleNewJoyProperty::place_of_activity => PlaceOfActivity::NEWJOY_DISCORD,
        CircleNewJoyProperty::description       => 'ぜひ参加してください',
        CircleNewJoyProperty::release           => true,
        CircleNewJoyProperty::start_date        => Carbon::now()->subHour(1)->copy(),
        CircleNewJoyProperty::end_date          => Carbon::now()->addHour(4)->copy(),
    ];
});

$factory->state(CircleNewJoy::class, 'pastFixed', function (Faker $faker) {
    return [
        CircleNewJoyProperty::title             => '交流会',
        CircleNewJoyProperty::place_of_activity => PlaceOfActivity::NEWJOY_DISCORD,
        CircleNewJoyProperty::description       => 'ぜひ参加してください',
        CircleNewJoyProperty::release           => true,
        CircleNewJoyProperty::start_date        => (new Carbon("2021-01-25 18:00:00"))->subHour(1)->copy(),
        CircleNewJoyProperty::end_date          => (new Carbon("2021-01-25 18:00:00"))->addHour(4)->copy(),
    ];
});

$factory->state(CircleNewJoy::class, 'futureFixed', function (Faker $faker) {
    return [
        CircleNewJoyProperty::title             => '交流会',
        CircleNewJoyProperty::place_of_activity => PlaceOfActivity::NEWJOY_DISCORD,
        CircleNewJoyProperty::description       => 'ぜひ参加してください',
        CircleNewJoyProperty::release           => true,
        CircleNewJoyProperty::start_date        => (new Carbon("2021-05-25 18:00:00"))->subHour(1)->copy(),
        CircleNewJoyProperty::end_date          => (new Carbon("2021-05-25 18:00:00"))->addHour(4)->copy(),
    ];
});
