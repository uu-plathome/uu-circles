<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Enum\CircleType;
use App\Enum\CircleInformationModel;
use App\Enum\DateOfActivity;
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
        CircleInformationModel::name        => 'U-lab',
        CircleInformationModel::name_kana   => 'うらぼ',
        CircleInformationModel::short_name  => 'U-lab',
        CircleInformationModel::prefix_name => '地域に根差す学生集団',
        CircleInformationModel::circle_type => CircleType::STUDENT_GROUP,
        CircleInformationModel::description => '宇都宮大学学生団体。地域に根差すテクノロジー集団。',
        CircleInformationModel::intro       => '一昨年できたばかり小さな学生団体です。情報、生物、建築などの異分野横断をしながら、学内外問わず研究、展示を行う宇大のデジタルクリエイティブ集団をやってます。
（今までやってたこと例）
・木材×プログラミング
・AR×都市開発
・web×新歓（今回のサイト）
展示会で展示した作品はインスタやTwitterにUPしてあるので見ていただけたら嬉しいです。
大学生活でちょっと面白いことしてみたい人におすすめの学生団体です。',
        CircleInformationModel::place_of_activity        => PlaceOfActivity::MINE,
        CircleInformationModel::place_of_activity_detail => 'オンライン活動もしています。',
        CircleInformationModel::do_online_activity       => true,
        CircleInformationModel::date_of_activity_monday    => null,
        CircleInformationModel::date_of_activity_tuesday   => null,
        CircleInformationModel::date_of_activity_wednesday => DateOfActivity::EVERY_WEEK,
        CircleInformationModel::date_of_activity_thursday  => null,
        CircleInformationModel::date_of_activity_friday    => null,
        CircleInformationModel::date_of_activity_saturday  => DateOfActivity::EVERY_WEEK,
        CircleInformationModel::date_of_activity_sunday    => DateOfActivity::EVERY_OTHER_WEEK,
        CircleInformationModel::date_of_activity_detail    => '日曜日はイベントを開きます',
        CircleInformationModel::admission_fee              => '年間2000円 + 学祭時に3000円です。',
        CircleInformationModel::number_of_members          => 10,
        CircleInformationModel::public_email               => 'example@example.com',
        CircleInformationModel::twitter_url                => 'https://twitter.com',
        CircleInformationModel::instagram_url              => 'https://instagram.com',
        CircleInformationModel::github_url                 => 'https://github.com/u-lab',
    ];
});

$factory->state(CircleInformation::class, '非公開', function (Faker $faker) {
    return [
        CircleModel::slug    => $faker->slug,
        CircleModel::release => false,
    ];
});
