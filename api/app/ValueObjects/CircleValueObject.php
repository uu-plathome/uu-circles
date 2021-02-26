<?php

namespace App\ValueObjects;

use App\Enum\Property\CircleInformationProperty;
use App\Enum\Property\CircleProperty;
use App\Models\Circle;
use App\Models\CircleHandbill;
use App\Models\CircleInformation;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class CircleValueObject
{
    public ?int $id;
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
    public ?string $admission_fee_per_year;
    public ?int $weekly_activity_days;
    public ?bool $mammoth;
    public ?bool $active_activity;
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
    public ?Carbon $created_at;
    public ?Carbon $updated_at;

    public static function byEloquent(
        Circle $circle,
        ?CircleInformation $circleInformation,
        ?CircleHandbill $circleHandbill
    ): CircleValueObject {
        $circleValueObject = new CircleValueObject();
        $circleValueObject->id = $circle->id;
        $circleValueObject->slug = $circle->slug;
        $circleValueObject->release = $circle->release;
        $circleValueObject->name = $circle->name;

        $circleValueObject->circle_type = $circleInformation ? $circleInformation->circle_type : null;
        $circleValueObject->name_kana = $circleInformation ? $circleInformation->name_kana : null;
        $circleValueObject->short_name = $circleInformation ? $circleInformation->short_name : null;
        $circleValueObject->prefix_name = $circleInformation ? $circleInformation->prefix_name : null;
        $circleValueObject->description = $circleInformation ? $circleInformation->description : null;
        $circleValueObject->common_place_of_activity = $circleInformation ? $circleInformation->common_place_of_activity : null;
        $circleValueObject->common_place_of_activity_detail = $circleInformation ? $circleInformation->common_place_of_activity_detail : null;
        $circleValueObject->common_date_of_activity_monday = $circleInformation ? $circleInformation->common_date_of_activity_monday : false;
        $circleValueObject->common_date_of_activity_tuesday = $circleInformation ? $circleInformation->common_date_of_activity_tuesday : false;
        $circleValueObject->common_date_of_activity_wednesday = $circleInformation ? $circleInformation->common_date_of_activity_wednesday : false;
        $circleValueObject->common_date_of_activity_thursday = $circleInformation ? $circleInformation->common_date_of_activity_thursday : false;
        $circleValueObject->common_date_of_activity_friday = $circleInformation ? $circleInformation->common_date_of_activity_friday : false;
        $circleValueObject->common_date_of_activity_saturday = $circleInformation ? $circleInformation->common_date_of_activity_saturday : false;
        $circleValueObject->common_date_of_activity_sunday = $circleInformation ? $circleInformation->common_date_of_activity_sunday : false;
        $circleValueObject->common_date_of_activity_detail = $circleInformation ? $circleInformation->common_date_of_activity_detail : null;
        $circleValueObject->is_online_activity = $circleInformation ? $circleInformation->is_online_activity : null;
        $circleValueObject->online_place_of_activity_detail = $circleInformation ? $circleInformation->online_place_of_activity_detail : null;
        $circleValueObject->online_date_of_activity_monday = $circleInformation ? $circleInformation->online_date_of_activity_monday : false;
        $circleValueObject->online_date_of_activity_tuesday = $circleInformation ? $circleInformation->online_date_of_activity_tuesday : false;
        $circleValueObject->online_date_of_activity_wednesday = $circleInformation ? $circleInformation->online_date_of_activity_wednesday : false;
        $circleValueObject->online_date_of_activity_thursday = $circleInformation ? $circleInformation->online_date_of_activity_thursday : false;
        $circleValueObject->online_date_of_activity_friday = $circleInformation ? $circleInformation->online_date_of_activity_friday : false;
        $circleValueObject->online_date_of_activity_saturday = $circleInformation ? $circleInformation->online_date_of_activity_saturday : false;
        $circleValueObject->online_date_of_activity_sunday = $circleInformation ? $circleInformation->online_date_of_activity_sunday : false;
        $circleValueObject->online_date_of_activity_detail = $circleInformation ? $circleInformation->online_date_of_activity_detail : null;
        $circleValueObject->is_club_activities = $circleInformation ? $circleInformation->is_club_activities : null;
        $circleValueObject->appealing_point1 = $circleInformation ? $circleInformation->appealing_point1 : null;
        $circleValueObject->appealing_point2 = $circleInformation ? $circleInformation->appealing_point2 : null;
        $circleValueObject->appealing_point3 = $circleInformation ? $circleInformation->appealing_point3 : null;
        $circleValueObject->admission_fee_per_year = $circleInformation ? $circleInformation->admission_fee_per_year : null;
        $circleValueObject->weekly_activity_days = $circleInformation ? $circleInformation->weeklyActivityDays() : null;
        $circleValueObject->mammoth = $circleInformation ? $circleInformation->mammoth : null;
        $circleValueObject->active_activity = $circleInformation ? $circleInformation->activeActivity : null;
        $circleValueObject->number_of_members = $circleInformation ? $circleInformation->number_of_members : null;
        $circleValueObject->public_email = $circleInformation ? $circleInformation->public_email : null;
        $circleValueObject->twitter_url = $circleInformation ? $circleInformation->twitter_url : null;
        $circleValueObject->facebook_url = $circleInformation ? $circleInformation->facebook_url : null;
        $circleValueObject->instagram_url = $circleInformation ? $circleInformation->instagram_url : null;
        $circleValueObject->line_url = $circleInformation ? $circleInformation->line_url : null;
        $circleValueObject->youtube_url = $circleInformation ? $circleInformation->youtube_url : null;
        $circleValueObject->homepage_url = $circleInformation ? $circleInformation->homepage_url : null;
        $circleValueObject->peing_url = $circleInformation ? $circleInformation->peing_url : null;
        $circleValueObject->github_url = $circleInformation ? $circleInformation->github_url : null;
        $circleValueObject->tiktok_url = $circleInformation ? $circleInformation->tiktok_url : null;
        $circleValueObject->participation_url = $circleInformation ? $circleInformation->participation_url : null;
        $circleValueObject->created_at = $circle->created_at;
        $circleValueObject->updated_at = $circle->updated_at;
        $circleValueObject->main_image_url = $circleInformation ? $circleInformation->main_image_url : null;
        $circleValueObject->activity_image_url1 = $circleInformation ? $circleInformation->activity_image_url1 : null;
        $circleValueObject->activity_image_url2 = $circleInformation ? $circleInformation->activity_image_url2 : null;
        $circleValueObject->activity_image_url3 = $circleInformation ? $circleInformation->activity_image_url3 : null;
        $circleValueObject->activity_image_url4 = $circleInformation ? $circleInformation->activity_image_url4 : null;
        $circleValueObject->activity_image_url5 = $circleInformation ? $circleInformation->activity_image_url5 : null;
        $circleValueObject->activity_image_url6 = $circleInformation ? $circleInformation->activity_image_url6 : null;
        $circleValueObject->handbill_image_url = $circleHandbill ?  $circleHandbill->image_url : null;

        return $circleValueObject;
    }

    public function toCircleProperty(): Circle
    {
        $circle = new Circle([
            CircleProperty::name       => $this->name,
            CircleProperty::slug       => $this->slug,
            CircleProperty::release    => $this->release,
            CircleProperty::created_at => $this->created_at,
            CircleProperty::updated_at => $this->updated_at,
        ]);
        $circle->id = $this->id;
        return $circle;
    }

    public function toCircleInformationProperty(): CircleInformation
    {
        return new CircleInformation([
            CircleInformationProperty::circle_id => $this->id,
            CircleInformationProperty::circle_type => $this->circle_type,
            CircleInformationProperty::name_kana => $this->name_kana,
            CircleInformationProperty::short_name => $this->short_name,
            CircleInformationProperty::prefix_name => $this->prefix_name,
            CircleInformationProperty::description => $this->description,
            CircleInformationProperty::common_place_of_activity => $this->common_place_of_activity,
            CircleInformationProperty::common_place_of_activity_detail => $this->common_place_of_activity_detail,
            CircleInformationProperty::common_date_of_activity_monday => $this->common_date_of_activity_monday,
            CircleInformationProperty::common_date_of_activity_tuesday => $this->common_date_of_activity_tuesday,
            CircleInformationProperty::common_date_of_activity_wednesday => $this->common_date_of_activity_wednesday,
            CircleInformationProperty::common_date_of_activity_thursday => $this->common_date_of_activity_thursday,
            CircleInformationProperty::common_date_of_activity_friday => $this->common_date_of_activity_friday,
            CircleInformationProperty::common_date_of_activity_saturday => $this->common_date_of_activity_saturday,
            CircleInformationProperty::common_date_of_activity_sunday => $this->common_date_of_activity_sunday,
            CircleInformationProperty::common_date_of_activity_detail => $this->common_date_of_activity_detail,
            CircleInformationProperty::is_online_activity => $this->is_online_activity !== null ? $this->is_online_activity : true,
            CircleInformationProperty::online_place_of_activity_detail => $this->online_place_of_activity_detail,
            CircleInformationProperty::online_date_of_activity_monday => $this->online_date_of_activity_monday,
            CircleInformationProperty::online_date_of_activity_tuesday => $this->online_date_of_activity_tuesday,
            CircleInformationProperty::online_date_of_activity_wednesday => $this->online_date_of_activity_wednesday,
            CircleInformationProperty::online_date_of_activity_thursday => $this->online_date_of_activity_thursday,
            CircleInformationProperty::online_date_of_activity_friday => $this->online_date_of_activity_friday,
            CircleInformationProperty::online_date_of_activity_saturday => $this->online_date_of_activity_saturday,
            CircleInformationProperty::online_date_of_activity_sunday => $this->online_date_of_activity_sunday,
            CircleInformationProperty::online_date_of_activity_detail => $this->online_date_of_activity_detail,
            CircleInformationProperty::admission_fee_per_year => $this->admission_fee_per_year,
            CircleInformationProperty::number_of_members => $this->number_of_members,
            CircleInformationProperty::is_club_activities => $this->is_club_activities,
            CircleInformationProperty::appealing_point1 => $this->appealing_point1,
            CircleInformationProperty::appealing_point2 => $this->appealing_point2,
            CircleInformationProperty::appealing_point3 => $this->appealing_point3,
            CircleInformationProperty::public_email => $this->public_email,
            CircleInformationProperty::twitter_url => $this->twitter_url,
            CircleInformationProperty::facebook_url => $this->facebook_url,
            CircleInformationProperty::instagram_url => $this->instagram_url,
            CircleInformationProperty::line_url => $this->line_url,
            CircleInformationProperty::youtube_url => $this->youtube_url,
            CircleInformationProperty::homepage_url => $this->homepage_url,
            CircleInformationProperty::peing_url => $this->peing_url,
            CircleInformationProperty::github_url => $this->github_url,
            CircleInformationProperty::tiktok_url => $this->tiktok_url,
            CircleInformationProperty::participation_url => $this->participation_url,
            CircleInformationProperty::main_image_url => $this->main_image_url,
            CircleInformationProperty::activity_image_url1 => $this->activity_image_url1,
            CircleInformationProperty::activity_image_url2 => $this->activity_image_url2,
            CircleInformationProperty::activity_image_url3 => $this->activity_image_url3,
            CircleInformationProperty::activity_image_url4 => $this->activity_image_url4,
            CircleInformationProperty::activity_image_url5 => $this->activity_image_url5,
            CircleInformationProperty::activity_image_url6 => $this->activity_image_url6,
        ]);
    }

    public function toCircleHandbill(): CircleHandbill
    {
        return new CircleHandbill([
            'image_url' => $this->handbill_image_url,
            'year'      => 2021,
        ]);
    }

    public function toArray(): array
    {
        return [
            CircleProperty::id         => $this->id,
            CircleProperty::slug       => $this->slug,
            CircleProperty::release    => $this->release,
            CircleProperty::name       => $this->name,
            CircleProperty::created_at => $this->created_at,
            CircleProperty::updated_at => $this->updated_at,
            CircleInformationProperty::circle_type => $this->circle_type,
            CircleInformationProperty::name_kana => $this->name_kana,
            CircleInformationProperty::short_name => $this->short_name,
            CircleInformationProperty::prefix_name => $this->prefix_name,
            CircleInformationProperty::description => $this->description,
            CircleInformationProperty::common_place_of_activity => $this->common_place_of_activity,
            CircleInformationProperty::common_place_of_activity_detail => $this->common_place_of_activity_detail,
            CircleInformationProperty::common_date_of_activity_monday => $this->common_date_of_activity_monday,
            CircleInformationProperty::common_date_of_activity_tuesday => $this->common_date_of_activity_tuesday,
            CircleInformationProperty::common_date_of_activity_wednesday => $this->common_date_of_activity_wednesday,
            CircleInformationProperty::common_date_of_activity_thursday => $this->common_date_of_activity_thursday,
            CircleInformationProperty::common_date_of_activity_friday => $this->common_date_of_activity_friday,
            CircleInformationProperty::common_date_of_activity_saturday => $this->common_date_of_activity_saturday,
            CircleInformationProperty::common_date_of_activity_sunday => $this->common_date_of_activity_sunday,
            CircleInformationProperty::common_date_of_activity_detail => $this->common_date_of_activity_detail,
            CircleInformationProperty::is_online_activity => $this->is_online_activity !== null ? $this->is_online_activity : true,
            CircleInformationProperty::online_place_of_activity_detail => $this->online_place_of_activity_detail,
            CircleInformationProperty::online_date_of_activity_monday => $this->online_date_of_activity_monday,
            CircleInformationProperty::online_date_of_activity_tuesday => $this->online_date_of_activity_tuesday,
            CircleInformationProperty::online_date_of_activity_wednesday => $this->online_date_of_activity_wednesday,
            CircleInformationProperty::online_date_of_activity_thursday => $this->online_date_of_activity_thursday,
            CircleInformationProperty::online_date_of_activity_friday => $this->online_date_of_activity_friday,
            CircleInformationProperty::online_date_of_activity_saturday => $this->online_date_of_activity_saturday,
            CircleInformationProperty::online_date_of_activity_sunday => $this->online_date_of_activity_sunday,
            CircleInformationProperty::online_date_of_activity_detail => $this->online_date_of_activity_detail,
            CircleInformationProperty::is_club_activities => $this->is_club_activities,
            CircleInformationProperty::appealing_point1 => $this->appealing_point1,
            CircleInformationProperty::appealing_point2 => $this->appealing_point2,
            CircleInformationProperty::appealing_point3 => $this->appealing_point3,
            CircleInformationProperty::admission_fee_per_year => $this->admission_fee_per_year,
            CircleInformationProperty::number_of_members => $this->number_of_members,
            'weekly_activity_days' => $this->weekly_activity_days,
            'mammoth' => $this->mammoth,
            'active_activity' => $this->active_activity,
            CircleInformationProperty::public_email => $this->public_email,
            CircleInformationProperty::twitter_url => $this->twitter_url,
            CircleInformationProperty::facebook_url => $this->facebook_url,
            CircleInformationProperty::instagram_url => $this->instagram_url,
            CircleInformationProperty::line_url => $this->line_url,
            CircleInformationProperty::youtube_url => $this->youtube_url,
            CircleInformationProperty::homepage_url => $this->homepage_url,
            CircleInformationProperty::peing_url => $this->peing_url,
            CircleInformationProperty::github_url => $this->github_url,
            CircleInformationProperty::tiktok_url => $this->tiktok_url,
            CircleInformationProperty::participation_url => $this->participation_url,
            CircleInformationProperty::main_image_url => $this->main_image_url,
            CircleInformationProperty::activity_image_url1 => $this->activity_image_url1,
            CircleInformationProperty::activity_image_url2 => $this->activity_image_url2,
            CircleInformationProperty::activity_image_url3 => $this->activity_image_url3,
            CircleInformationProperty::activity_image_url4 => $this->activity_image_url4,
            CircleInformationProperty::activity_image_url5 => $this->activity_image_url5,
            CircleInformationProperty::activity_image_url6 => $this->activity_image_url6,
            'handbill_image_url' => $this->handbill_image_url,
        ];
    }
}
