<?php

namespace App\Models;

use App\Enum\CircleInformationModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CircleInformation extends Model
{
    protected $fillable = [
        CircleInformationModel::circle_id,
        CircleInformationModel::circle_type_id,
        CircleInformationModel::name,
        CircleInformationModel::name_kana,
        CircleInformationModel::short_name,
        CircleInformationModel::prefix_name,
        CircleInformationModel::description,
        CircleInformationModel::intro,
        CircleInformationModel::place_of_activity,
        CircleInformationModel::place_of_activity_detail,
        CircleInformationModel::do_online_activity,
        CircleInformationModel::date_of_activity_monday,
        CircleInformationModel::date_of_activity_tuesday,
        CircleInformationModel::date_of_activity_wednesday,
        CircleInformationModel::date_of_activity_thursday,
        CircleInformationModel::date_of_activity_friday,
        CircleInformationModel::date_of_activity_saturday,
        CircleInformationModel::date_of_activity_sunday,
        CircleInformationModel::date_of_activity_detail,
        CircleInformationModel::admission_fee,
        CircleInformationModel::number_of_members,
        CircleInformationModel::public_email,
        CircleInformationModel::twitter_url,
        CircleInformationModel::facebook_url,
        CircleInformationModel::instagram_url,
        CircleInformationModel::line_url,
        CircleInformationModel::youtube_url,
        CircleInformationModel::homepage_url,
        CircleInformationModel::peing_url,
        CircleInformationModel::github_url,
        CircleInformationModel::tiktok_url,
        CircleInformationModel::participation_url,
    ];

    public function circle(): BelongsTo
    {
        return $this->belongsTo(Circle::class);
    }
}
