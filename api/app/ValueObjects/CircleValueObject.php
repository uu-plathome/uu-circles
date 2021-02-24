<?php

namespace App\ValueObjects;

use App\Enum\CircleInformationModel;
use App\Enum\CircleModel;
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
    public ?bool $common_date_of_activity_monday;
    public ?bool $common_date_of_activity_tuesday;
    public ?bool $common_date_of_activity_wednesday;
    public ?bool $common_date_of_activity_thursday;
    public ?bool $common_date_of_activity_friday;
    public ?bool $common_date_of_activity_saturday;
    public ?bool $common_date_of_activity_sunday;
    public ?string $common_date_of_activity_detail;
    public ?bool $is_online_activity;
    public ?string $online_place_of_activity_detail;
    public ?bool $online_date_of_activity_monday;
    public ?bool $online_date_of_activity_tuesday;
    public ?bool $online_date_of_activity_wednesday;
    public ?bool $online_date_of_activity_thursday;
    public ?bool $online_date_of_activity_friday;
    public ?bool $online_date_of_activity_saturday;
    public ?bool $online_date_of_activity_sunday;
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
        $circleValueObject->common_date_of_activity_monday = $circleInformation ? $circleInformation->common_date_of_activity_monday : null;
        $circleValueObject->common_date_of_activity_tuesday = $circleInformation ? $circleInformation->common_date_of_activity_tuesday : null;
        $circleValueObject->common_date_of_activity_wednesday = $circleInformation ? $circleInformation->common_date_of_activity_wednesday : null;
        $circleValueObject->common_date_of_activity_thursday = $circleInformation ? $circleInformation->common_date_of_activity_thursday : null;
        $circleValueObject->common_date_of_activity_friday = $circleInformation ? $circleInformation->common_date_of_activity_friday : null;
        $circleValueObject->common_date_of_activity_saturday = $circleInformation ? $circleInformation->common_date_of_activity_saturday : null;
        $circleValueObject->common_date_of_activity_sunday = $circleInformation ? $circleInformation->common_date_of_activity_sunday : null;
        $circleValueObject->common_date_of_activity_detail = $circleInformation ? $circleInformation->common_date_of_activity_detail : null;
        $circleValueObject->is_online_activity = $circleInformation ? $circleInformation->is_online_activity : null;
        $circleValueObject->online_place_of_activity_detail = $circleInformation ? $circleInformation->online_place_of_activity_detail : null;
        $circleValueObject->online_date_of_activity_monday = $circleInformation ? $circleInformation->online_date_of_activity_monday : null;
        $circleValueObject->online_date_of_activity_tuesday = $circleInformation ? $circleInformation->online_date_of_activity_tuesday : null;
        $circleValueObject->online_date_of_activity_wednesday = $circleInformation ? $circleInformation->online_date_of_activity_wednesday : null;
        $circleValueObject->online_date_of_activity_thursday = $circleInformation ? $circleInformation->online_date_of_activity_thursday : null;
        $circleValueObject->online_date_of_activity_friday = $circleInformation ? $circleInformation->online_date_of_activity_friday : null;
        $circleValueObject->online_date_of_activity_saturday = $circleInformation ? $circleInformation->online_date_of_activity_saturday : null;
        $circleValueObject->online_date_of_activity_sunday = $circleInformation ? $circleInformation->online_date_of_activity_sunday : null;
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

    public function toCircleModel(): Circle
    {
        $circle = new Circle([
            CircleModel::name       => $this->name,
            CircleModel::slug       => $this->slug,
            CircleModel::release    => $this->release,
            CircleModel::created_at => $this->created_at,
            CircleModel::updated_at => $this->updated_at,
        ]);
        $circle->id = $this->id;
        return $circle;
    }

    public function toCircleInformationModel(): CircleInformation
    {
        return new CircleInformation([
            CircleInformationModel::circle_id => $this->id,
            CircleInformationModel::circle_type => $this->circle_type,
            CircleInformationModel::name_kana => $this->name_kana,
            CircleInformationModel::short_name => $this->short_name,
            CircleInformationModel::prefix_name => $this->prefix_name,
            CircleInformationModel::description => $this->description,
            CircleInformationModel::common_place_of_activity => $this->common_place_of_activity,
            CircleInformationModel::common_place_of_activity_detail => $this->common_place_of_activity_detail,
            CircleInformationModel::common_date_of_activity_monday => $this->common_date_of_activity_monday,
            CircleInformationModel::common_date_of_activity_tuesday => $this->common_date_of_activity_tuesday,
            CircleInformationModel::common_date_of_activity_wednesday => $this->common_date_of_activity_wednesday,
            CircleInformationModel::common_date_of_activity_thursday => $this->common_date_of_activity_thursday,
            CircleInformationModel::common_date_of_activity_friday => $this->common_date_of_activity_friday,
            CircleInformationModel::common_date_of_activity_saturday => $this->common_date_of_activity_saturday,
            CircleInformationModel::common_date_of_activity_sunday => $this->common_date_of_activity_sunday,
            CircleInformationModel::common_date_of_activity_detail => $this->common_date_of_activity_detail,
            CircleInformationModel::is_online_activity => $this->is_online_activity !== null ? $this->is_online_activity : true,
            CircleInformationModel::online_place_of_activity_detail => $this->online_place_of_activity_detail,
            CircleInformationModel::online_date_of_activity_monday => $this->online_date_of_activity_monday,
            CircleInformationModel::online_date_of_activity_tuesday => $this->online_date_of_activity_tuesday,
            CircleInformationModel::online_date_of_activity_wednesday => $this->online_date_of_activity_wednesday,
            CircleInformationModel::online_date_of_activity_thursday => $this->online_date_of_activity_thursday,
            CircleInformationModel::online_date_of_activity_friday => $this->online_date_of_activity_friday,
            CircleInformationModel::online_date_of_activity_saturday => $this->online_date_of_activity_saturday,
            CircleInformationModel::online_date_of_activity_sunday => $this->online_date_of_activity_sunday,
            CircleInformationModel::online_date_of_activity_detail => $this->online_date_of_activity_detail,
            CircleInformationModel::admission_fee_per_year => $this->admission_fee_per_year,
            CircleInformationModel::number_of_members => $this->number_of_members,
            CircleInformationModel::is_club_activities => $this->is_club_activities,
            CircleInformationModel::appealing_point1 => $this->appealing_point1,
            CircleInformationModel::appealing_point2 => $this->appealing_point2,
            CircleInformationModel::appealing_point3 => $this->appealing_point3,
            CircleInformationModel::public_email => $this->public_email,
            CircleInformationModel::twitter_url => $this->twitter_url,
            CircleInformationModel::facebook_url => $this->facebook_url,
            CircleInformationModel::instagram_url => $this->instagram_url,
            CircleInformationModel::line_url => $this->line_url,
            CircleInformationModel::youtube_url => $this->youtube_url,
            CircleInformationModel::homepage_url => $this->homepage_url,
            CircleInformationModel::peing_url => $this->peing_url,
            CircleInformationModel::github_url => $this->github_url,
            CircleInformationModel::tiktok_url => $this->tiktok_url,
            CircleInformationModel::participation_url => $this->participation_url,
            CircleInformationModel::main_image_url => $this->main_image_url,
            CircleInformationModel::activity_image_url1 => $this->activity_image_url1,
            CircleInformationModel::activity_image_url2 => $this->activity_image_url2,
            CircleInformationModel::activity_image_url3 => $this->activity_image_url3,
            CircleInformationModel::activity_image_url4 => $this->activity_image_url4,
            CircleInformationModel::activity_image_url5 => $this->activity_image_url5,
            CircleInformationModel::activity_image_url6 => $this->activity_image_url6,
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
            CircleModel::id         => $this->id,
            CircleModel::slug       => $this->slug,
            CircleModel::release    => $this->release,
            CircleModel::name       => $this->name,
            CircleModel::created_at => $this->created_at,
            CircleModel::updated_at => $this->updated_at,
            CircleInformationModel::circle_type => $this->circle_type,
            CircleInformationModel::name_kana => $this->name_kana,
            CircleInformationModel::short_name => $this->short_name,
            CircleInformationModel::prefix_name => $this->prefix_name,
            CircleInformationModel::description => $this->description,
            CircleInformationModel::common_place_of_activity => $this->common_place_of_activity,
            CircleInformationModel::common_place_of_activity_detail => $this->common_place_of_activity_detail,
            CircleInformationModel::common_date_of_activity_monday => $this->common_date_of_activity_monday,
            CircleInformationModel::common_date_of_activity_tuesday => $this->common_date_of_activity_tuesday,
            CircleInformationModel::common_date_of_activity_wednesday => $this->common_date_of_activity_wednesday,
            CircleInformationModel::common_date_of_activity_thursday => $this->common_date_of_activity_thursday,
            CircleInformationModel::common_date_of_activity_friday => $this->common_date_of_activity_friday,
            CircleInformationModel::common_date_of_activity_saturday => $this->common_date_of_activity_saturday,
            CircleInformationModel::common_date_of_activity_sunday => $this->common_date_of_activity_sunday,
            CircleInformationModel::common_date_of_activity_detail => $this->common_date_of_activity_detail,
            CircleInformationModel::is_online_activity => $this->is_online_activity !== null ? $this->is_online_activity : true,
            CircleInformationModel::online_place_of_activity_detail => $this->online_place_of_activity_detail,
            CircleInformationModel::online_date_of_activity_monday => $this->online_date_of_activity_monday,
            CircleInformationModel::online_date_of_activity_tuesday => $this->online_date_of_activity_tuesday,
            CircleInformationModel::online_date_of_activity_wednesday => $this->online_date_of_activity_wednesday,
            CircleInformationModel::online_date_of_activity_thursday => $this->online_date_of_activity_thursday,
            CircleInformationModel::online_date_of_activity_friday => $this->online_date_of_activity_friday,
            CircleInformationModel::online_date_of_activity_saturday => $this->online_date_of_activity_saturday,
            CircleInformationModel::online_date_of_activity_sunday => $this->online_date_of_activity_sunday,
            CircleInformationModel::online_date_of_activity_detail => $this->online_date_of_activity_detail,
            CircleInformationModel::is_club_activities => $this->is_club_activities,
            CircleInformationModel::appealing_point1 => $this->appealing_point1,
            CircleInformationModel::appealing_point2 => $this->appealing_point2,
            CircleInformationModel::appealing_point3 => $this->appealing_point3,
            CircleInformationModel::admission_fee_per_year => $this->admission_fee_per_year,
            CircleInformationModel::number_of_members => $this->number_of_members,
            'weekly_activity_days' => $this->weekly_activity_days,
            'mammoth' => $this->mammoth,
            'active_activity' => $this->active_activity,
            CircleInformationModel::public_email => $this->public_email,
            CircleInformationModel::twitter_url => $this->twitter_url,
            CircleInformationModel::facebook_url => $this->facebook_url,
            CircleInformationModel::instagram_url => $this->instagram_url,
            CircleInformationModel::line_url => $this->line_url,
            CircleInformationModel::youtube_url => $this->youtube_url,
            CircleInformationModel::homepage_url => $this->homepage_url,
            CircleInformationModel::peing_url => $this->peing_url,
            CircleInformationModel::github_url => $this->github_url,
            CircleInformationModel::tiktok_url => $this->tiktok_url,
            CircleInformationModel::participation_url => $this->participation_url,
            CircleInformationModel::main_image_url => $this->main_image_url,
            CircleInformationModel::activity_image_url1 => $this->activity_image_url1,
            CircleInformationModel::activity_image_url2 => $this->activity_image_url2,
            CircleInformationModel::activity_image_url3 => $this->activity_image_url3,
            CircleInformationModel::activity_image_url4 => $this->activity_image_url4,
            CircleInformationModel::activity_image_url5 => $this->activity_image_url5,
            CircleInformationModel::activity_image_url6 => $this->activity_image_url6,
            'handbill_image_url' => $this->handbill_image_url,
        ];
    }
}
