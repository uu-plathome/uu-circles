<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Enum\CircleType;
use App\Enum\Property\CircleProperty;
use App\Enum\Property\CircleInformationProperty;
use App\Enum\PlaceOfActivity;
use App\Models\CircleInformation;
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

$factory->define(CircleInformation::class, function (Faker $faker) {
    return [
        CircleInformationProperty::name_kana   => 'うらぼ',
        CircleInformationProperty::short_name  => 'U-lab',
        CircleInformationProperty::prefix_name => '地域に根差す学生集団',
        CircleInformationProperty::circle_type => CircleType::STUDENT_GROUP,
        CircleInformationProperty::description => '宇都宮大学学生団体。地域に根差すテクノロジー集団。',
        CircleInformationProperty::appealing_point1                  => '工学を使った地域おこし',
        CircleInformationProperty::appealing_point2                  => 'webサイトやメディアアート製作',
        CircleInformationProperty::appealing_point3                  => '大学一自由',
        CircleInformationProperty::common_place_of_activity          => PlaceOfActivity::MINE,
        CircleInformationProperty::common_place_of_activity_detail   => '4号館',
        CircleInformationProperty::common_date_of_activity_monday    => false,
        CircleInformationProperty::common_date_of_activity_tuesday   => false,
        CircleInformationProperty::common_date_of_activity_wednesday => true,
        CircleInformationProperty::common_date_of_activity_thursday  => false,
        CircleInformationProperty::common_date_of_activity_friday    => false,
        CircleInformationProperty::common_date_of_activity_saturday  => true,
        CircleInformationProperty::common_date_of_activity_sunday    => false,
        CircleInformationProperty::common_date_of_activity_detail    => '日曜日はイベントを開きます',
        CircleInformationProperty::is_online_activity                => true,
        CircleInformationProperty::online_place_of_activity_detail   => 'discordでやってます。',
        CircleInformationProperty::online_date_of_activity_monday    => false,
        CircleInformationProperty::online_date_of_activity_tuesday   => false,
        CircleInformationProperty::online_date_of_activity_wednesday => true,
        CircleInformationProperty::online_date_of_activity_thursday  => false,
        CircleInformationProperty::online_date_of_activity_friday    => false,
        CircleInformationProperty::online_date_of_activity_saturday  => true,
        CircleInformationProperty::online_date_of_activity_sunday    => false,
        CircleInformationProperty::online_date_of_activity_detail    => '日曜日はイベントを開きます',
        CircleInformationProperty::admission_fee_per_year              => 3000,
        CircleInformationProperty::number_of_members          => 10,
        CircleInformationProperty::public_email               => 'example@example.com',
        CircleInformationProperty::twitter_url                => 'https://twitter.com',
        CircleInformationProperty::instagram_url              => 'https://instagram.com',
        CircleInformationProperty::github_url                 => 'https://github.com/u-lab',
    ];
});

$factory->state(CircleInformation::class, '非公開', function (Faker $faker) {
    return [
        CircleProperty::slug    => $faker->slug,
        CircleProperty::release => false,
    ];
});
