<?php

namespace App\Usecases\AdminManagement\Circle\Param;

final class UpdateCircleUsecaseParam
{
    public int $circle_id;
    public ?string $slug;
    public bool $release;
    public string $name;
    public ?string $circle_type;
    public ?string $name_kana;
    public ?string $short_name;
    public ?string $prefix_name;
    public ?string $description;
    public ?string $common_place_of_activity;
    public ?string $common_place_of_activity_detail;
    public bool $common_date_of_activity_monday = false;
    public bool $common_date_of_activity_tuesday = false;
    public bool $common_date_of_activity_wednesday = false;
    public bool $common_date_of_activity_thursday = false;
    public bool $common_date_of_activity_friday = false;
    public bool $common_date_of_activity_saturday = false;
    public bool $common_date_of_activity_sunday = false;
    public ?string $common_date_of_activity_detail;
    public ?bool $is_online_activity;
    public ?string $online_place_of_activity_detail;
    public bool $online_date_of_activity_monday = false;
    public bool $online_date_of_activity_tuesday = false;
    public bool $online_date_of_activity_wednesday = false;
    public bool $online_date_of_activity_thursday = false;
    public bool $online_date_of_activity_friday = false;
    public bool $online_date_of_activity_saturday = false;
    public bool $online_date_of_activity_sunday = false;
    public ?string $online_date_of_activity_detail;
    public ?int $admission_fee_per_year;
    public ?int $number_of_members;
    public ?bool $is_club_activities;
    public ?string $appealing_point1;
    public ?string $appealing_point2;
    public ?string $appealing_point3;
    public ?string $public_email;
    public ?string $twitter_url;
    public ?string $facebook_url;
    public ?string $instagram_url;
    public ?string $line_url;
    public ?string $youtube_url;
    public ?string $homepage_url;
    public ?string $peing_url;
    public ?string $github_url;
    public ?string $tiktok_url;
    public ?string $participation_url;
    public ?string $main_image_url;
    public ?string $activity_image_url1;
    public ?string $activity_image_url2;
    public ?string $activity_image_url3;
    public ?string $activity_image_url4;
    public ?string $activity_image_url5;
    public ?string $activity_image_url6;
    public ?string $handbill_image_url;
}
