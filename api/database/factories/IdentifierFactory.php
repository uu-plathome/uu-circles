<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Enum\Property\IdentifierProperty;
use App\Enum\Property\UserProperty;
use App\Enum\UserTokenModel;
use App\Models\Identifier;
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

$factory->define(Identifier::class, function (Faker $faker) {
    return [
        IdentifierProperty::identifier_hash => Identifier::generateIdentifierHash(),
    ];
});