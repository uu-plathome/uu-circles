<?php

namespace App\Usecases\Admin\Circle\Dto;

use App\Models\Circle;
use App\Models\CircleHandbill;
use App\Models\CircleInformation;
use Illuminate\Support\Carbon;

final class UpdateCircleForSystemUsecaseDto
{
    public int $circle_id;
    public ?string $slug;
    public bool $release;
    public string $name;
    public bool $is_main_fixed;
    public bool $is_demo_fixed;
    public int $demo_priority;
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
    public ?string $wp_url;
    public ?bool $is_view_wp_post;
    public ?string $wp_tag_taxonomy;
    public ?string $handbill_image_url;

    public int $weekly_activity_days;
    public bool $mammoth;
    public int $active_activity;
    public Carbon $created_at;
    public Carbon $updated_at;

    public static function byEloquent(
        Circle $circle,
        CircleInformation $circleInformation,
        ?CircleHandbill $circleHandbill
    ): self {
        $dto = new self();

        $dto->circle_id = $circle->id;
        $dto->slug = $circle->slug;
        $dto->release = $circle->release;
        $dto->name = $circle->name;
        $dto->is_main_fixed = $circle->is_main_fixed;
        $dto->is_demo_fixed = $circle->is_demo_fixed;
        $dto->demo_priority = $circle->demo_priority;

        $dto->circle_type = $circleInformation->circle_type;
        $dto->name_kana = $circleInformation->name_kana;
        $dto->short_name = $circleInformation->short_name;
        $dto->prefix_name = $circleInformation->prefix_name;
        $dto->description = $circleInformation->description;
        $dto->common_place_of_activity = $circleInformation->common_place_of_activity;
        $dto->common_place_of_activity_detail = $circleInformation->common_place_of_activity_detail;
        $dto->common_date_of_activity_monday = $circleInformation->common_date_of_activity_monday;
        $dto->common_date_of_activity_tuesday = $circleInformation->common_date_of_activity_tuesday;
        $dto->common_date_of_activity_wednesday = $circleInformation->common_date_of_activity_wednesday;
        $dto->common_date_of_activity_thursday = $circleInformation->common_date_of_activity_thursday;
        $dto->common_date_of_activity_friday = $circleInformation->common_date_of_activity_friday;
        $dto->common_date_of_activity_saturday = $circleInformation->common_date_of_activity_saturday;
        $dto->common_date_of_activity_sunday = $circleInformation->common_date_of_activity_sunday;
        $dto->common_date_of_activity_detail = $circleInformation->common_date_of_activity_detail;
        $dto->is_online_activity = $circleInformation->is_online_activity;
        $dto->online_place_of_activity_detail = $circleInformation->online_place_of_activity_detail;
        $dto->online_date_of_activity_monday = $circleInformation->online_date_of_activity_monday;
        $dto->online_date_of_activity_tuesday = $circleInformation->online_date_of_activity_tuesday;
        $dto->online_date_of_activity_wednesday = $circleInformation->online_date_of_activity_wednesday;
        $dto->online_date_of_activity_thursday = $circleInformation->online_date_of_activity_thursday;
        $dto->online_date_of_activity_friday = $circleInformation->online_date_of_activity_friday;
        $dto->online_date_of_activity_saturday = $circleInformation->online_date_of_activity_saturday;
        $dto->online_date_of_activity_sunday = $circleInformation->online_date_of_activity_sunday;
        $dto->online_date_of_activity_detail = $circleInformation->online_date_of_activity_detail;
        $dto->is_club_activities = $circleInformation->is_club_activities;
        $dto->appealing_point1 = $circleInformation->appealing_point1;
        $dto->appealing_point2 = $circleInformation->appealing_point2;
        $dto->appealing_point3 = $circleInformation->appealing_point3;
        $dto->admission_fee_per_year = $circleInformation->admission_fee_per_year;
        $dto->weekly_activity_days = $circleInformation->weeklyActivityDays();
        $dto->mammoth = $circleInformation->mammoth;
        $dto->active_activity = $circleInformation->activeActivity;
        $dto->number_of_members = $circleInformation->number_of_members;
        $dto->public_email = $circleInformation->public_email;
        $dto->twitter_url = $circleInformation->twitter_url;
        $dto->facebook_url = $circleInformation->facebook_url;
        $dto->instagram_url = $circleInformation->instagram_url;
        $dto->line_url = $circleInformation->line_url;
        $dto->youtube_url = $circleInformation->youtube_url;
        $dto->homepage_url = $circleInformation->homepage_url;
        $dto->peing_url = $circleInformation->peing_url;
        $dto->github_url = $circleInformation->github_url;
        $dto->tiktok_url = $circleInformation->tiktok_url;
        $dto->participation_url = $circleInformation->participation_url;
        $dto->created_at = $circle->created_at;
        $dto->updated_at = $circle->updated_at;
        $dto->main_image_url = $circleInformation->main_image_url;
        $dto->activity_image_url1 = $circleInformation->activity_image_url1;
        $dto->activity_image_url2 = $circleInformation->activity_image_url2;
        $dto->activity_image_url3 = $circleInformation->activity_image_url3;
        $dto->activity_image_url4 = $circleInformation->activity_image_url4;
        $dto->activity_image_url5 = $circleInformation->activity_image_url5;
        $dto->activity_image_url6 = $circleInformation->activity_image_url6;
        $dto->wp_url = $circleInformation->wp_url;
        $dto->is_view_wp_post = $circleInformation->is_view_wp_post;
        $dto->wp_tag_taxonomy = $circleInformation->wp_tag_taxonomy;
        $dto->handbill_image_url = $circleHandbill ? $circleHandbill->image_url : null;

        return $dto;
    }
}
