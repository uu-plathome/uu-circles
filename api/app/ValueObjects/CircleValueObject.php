<?php

namespace App\ValueObjects;

use App\Enum\CircleInformationModel;
use App\Enum\CircleModel;
use App\Models\Circle;
use App\Models\CircleInformation;
use Illuminate\Support\Carbon;

class CircleValueObject
{
    public ?int $id;
    public ?string $slug;
    public bool $release;
    public string $name;
    public ?string $circle_type_id;
    public ?string $name_kana;
    public ?string $short_name;
    public ?string $prefix_name;
    public ?string $description;
    public ?string $intro;
    public ?string $place_of_activity;
    public ?string $place_of_activity_detail;
    public ?bool $do_online_activity;
    public ?string $date_of_activity_monday;
    public ?string $date_of_activity_tuesday;
    public ?string $date_of_activity_wednesday;
    public ?string $date_of_activity_thursday;
    public ?string $date_of_activity_friday;
    public ?string $date_of_activity_saturday;
    public ?string $date_of_activity_sunday;
    public ?string $date_of_activity_detail;
    public ?string $admission_fee;
    public ?int $number_of_members;
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
    public ?Carbon $created_at;
    public ?Carbon $updated_at;

    public static function byEloquent(
        Circle $circle,
        CircleInformation $circleInformation
    ): CircleValueObject {
        $circleValueObject = new CircleValueObject();
        $circleValueObject->id = $circle->id;
        $circleValueObject->slug = $circle->slug;
        $circleValueObject->release = $circle->release;
        $circleValueObject->circle_type_id = $circleInformation->circle_type_id;
        $circleValueObject->name = $circleInformation->name;
        $circleValueObject->name_kana = $circleInformation->name_kana;
        $circleValueObject->short_name = $circleInformation->short_name;
        $circleValueObject->prefix_name = $circleInformation->prefix_name;
        $circleValueObject->description = $circleInformation->description;
        $circleValueObject->intro = $circleInformation->intro;
        $circleValueObject->place_of_activity = $circleInformation->place_of_activity;
        $circleValueObject->place_of_activity_detail = $circleInformation->place_of_activity_detail;
        $circleValueObject->do_online_activity = $circleInformation->do_online_activity;
        $circleValueObject->date_of_activity_monday = $circleInformation->date_of_activity_monday;
        $circleValueObject->date_of_activity_tuesday = $circleInformation->date_of_activity_tuesday;
        $circleValueObject->date_of_activity_wednesday = $circleInformation->date_of_activity_wednesday;
        $circleValueObject->date_of_activity_thursday = $circleInformation->date_of_activity_thursday;
        $circleValueObject->date_of_activity_friday = $circleInformation->date_of_activity_friday;
        $circleValueObject->date_of_activity_saturday = $circleInformation->date_of_activity_saturday;
        $circleValueObject->date_of_activity_sunday = $circleInformation->date_of_activity_sunday;
        $circleValueObject->date_of_activity_detail = $circleInformation->date_of_activity_detail;
        $circleValueObject->admission_fee = $circleInformation->admission_fee;
        $circleValueObject->number_of_members = $circleInformation->number_of_members;
        $circleValueObject->public_email = $circleInformation->public_email;
        $circleValueObject->twitter_url = $circleInformation->twitter_url;
        $circleValueObject->facebook_url = $circleInformation->facebook_url;
        $circleValueObject->instagram_url = $circleInformation->instagram_url;
        $circleValueObject->line_url = $circleInformation->line_url;
        $circleValueObject->youtube_url = $circleInformation->youtube_url;
        $circleValueObject->homepage_url = $circleInformation->homepage_url;
        $circleValueObject->peing_url = $circleInformation->peing_url;
        $circleValueObject->github_url = $circleInformation->github_url;
        $circleValueObject->tiktok_url = $circleInformation->tiktok_url;
        $circleValueObject->participation_url = $circleInformation->participation_url;
        $circleValueObject->created_at = $circle->created_at;
        $circleValueObject->updated_at = $circle->updated_at;
        return $circleValueObject;
    }

    public function toCircleModel(): Circle
    {
        $circle = new Circle([
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
            CircleInformationModel::circle_type_id => $this->circle_type_id,
            CircleInformationModel::name => $this->name,
            CircleInformationModel::name_kana => $this->name_kana,
            CircleInformationModel::short_name => $this->short_name,
            CircleInformationModel::prefix_name => $this->prefix_name,
            CircleInformationModel::description => $this->description,
            CircleInformationModel::intro => $this->intro,
            CircleInformationModel::place_of_activity => $this->place_of_activity,
            CircleInformationModel::place_of_activity_detail => $this->place_of_activity_detail,
            CircleInformationModel::do_online_activity => $this->do_online_activity !== null ? $this->do_online_activity : true,
            CircleInformationModel::date_of_activity_monday => $this->date_of_activity_monday,
            CircleInformationModel::date_of_activity_tuesday => $this->date_of_activity_tuesday,
            CircleInformationModel::date_of_activity_wednesday => $this->date_of_activity_wednesday,
            CircleInformationModel::date_of_activity_thursday => $this->date_of_activity_thursday,
            CircleInformationModel::date_of_activity_friday => $this->date_of_activity_friday,
            CircleInformationModel::date_of_activity_saturday => $this->date_of_activity_saturday,
            CircleInformationModel::date_of_activity_sunday => $this->date_of_activity_sunday,
            CircleInformationModel::date_of_activity_detail => $this->date_of_activity_detail,
            CircleInformationModel::admission_fee => $this->admission_fee,
            CircleInformationModel::number_of_members => $this->number_of_members,
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
        ]);
    }

    public function toArray(): array
    {
        return [
            CircleModel::id         => $this->id,
            CircleModel::slug       => $this->slug,
            CircleModel::release    => $this->release,
            CircleModel::created_at => $this->created_at,
            CircleModel::updated_at => $this->updated_at,
            CircleInformationModel::circle_type_id => $this->circle_type_id,
            CircleInformationModel::name => $this->name,
            CircleInformationModel::name_kana => $this->name_kana,
            CircleInformationModel::short_name => $this->short_name,
            CircleInformationModel::prefix_name => $this->prefix_name,
            CircleInformationModel::description => $this->description,
            CircleInformationModel::intro => $this->intro,
            CircleInformationModel::place_of_activity => $this->place_of_activity,
            CircleInformationModel::place_of_activity_detail => $this->place_of_activity_detail,
            CircleInformationModel::do_online_activity => $this->do_online_activity,
            CircleInformationModel::date_of_activity_monday => $this->date_of_activity_monday,
            CircleInformationModel::date_of_activity_tuesday => $this->date_of_activity_tuesday,
            CircleInformationModel::date_of_activity_wednesday => $this->date_of_activity_wednesday,
            CircleInformationModel::date_of_activity_thursday => $this->date_of_activity_thursday,
            CircleInformationModel::date_of_activity_friday => $this->date_of_activity_friday,
            CircleInformationModel::date_of_activity_saturday => $this->date_of_activity_saturday,
            CircleInformationModel::date_of_activity_sunday => $this->date_of_activity_sunday,
            CircleInformationModel::date_of_activity_detail => $this->date_of_activity_detail,
            CircleInformationModel::admission_fee => $this->admission_fee,
            CircleInformationModel::number_of_members => $this->number_of_members,
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
        ];
    }
}
