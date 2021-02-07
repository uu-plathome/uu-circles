<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * App\Models\AdminUser
 *
 * @property int $id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|AdminUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AdminUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AdminUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|AdminUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AdminUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AdminUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AdminUser whereUserId($value)
 */
	class AdminUser extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Advertise
 *
 * @property int $id
 * @property string $title 広告タイトル
 * @property string|null $main_image_url 画像URL
 * @property bool $active 公開するかどうか
 * @property \datetime|null $publish_to 公開開始日時
 * @property \datetime|null $publish_from 公開開始日時
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read bool $now_public
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise nowPublic(\Illuminate\Support\Carbon $now)
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise query()
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise whereMainImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise wherePublishFrom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise wherePublishTo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise whereUpdatedAt($value)
 */
	class Advertise extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Circle
 *
 * @property int $id
 * @property string $slug
 * @property bool $release
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CircleInformation|null $circleInformation
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\CircleInvitation[] $circleInvitation
 * @property-read int|null $circle_invitation_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\CircleNewJoy[] $circleNewJoys
 * @property-read int|null $circle_new_joys_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\CircleUser[] $circleUsers
 * @property-read int|null $circle_users_count
 * @method static \Illuminate\Database\Eloquent\Builder|Circle newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Circle newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Circle query()
 * @method static \Illuminate\Database\Eloquent\Builder|Circle whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Circle whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Circle whereRelease($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Circle whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Circle whereUpdatedAt($value)
 */
	class Circle extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\CircleInformation
 *
 * @property int $id
 * @property int $circle_id
 * @property string|null $circle_type
 * @property string $name サークル名
 * @property string|null $name_kana サークル名(カナ)
 * @property string|null $short_name サークル名(通称)
 * @property string|null $prefix_name サークル名(肩書)
 * @property string|null $description サークル短文紹介
 * @property string|null $intro サークル長文紹介
 * @property string|null $common_place_of_activity 通常活動場所
 * @property string|null $common_place_of_activity_detail 通常活動場所詳細
 * @property int|null $common_date_of_activity_monday 月曜日に通常活動しているか
 * @property int|null $common_date_of_activity_tuesday 火曜日に通常活動しているか
 * @property int|null $common_date_of_activity_wednesday 水曜日に通常活動しているか
 * @property int|null $common_date_of_activity_thursday 木曜日に通常活動しているか
 * @property int|null $common_date_of_activity_friday 金曜日に通常活動しているか
 * @property int|null $common_date_of_activity_saturday 土曜日に通常活動しているか
 * @property int|null $common_date_of_activity_sunday 日曜日に通常活動しているか
 * @property string|null $common_date_of_activity_detail 活動日時詳細
 * @property int $is_online_activity オンライン活動するか
 * @property string|null $online_place_of_activity_detail オンライン活動場所詳細
 * @property int|null $online_date_of_activity_monday 月曜日にオンライン活動しているか
 * @property int|null $online_date_of_activity_tuesday 火曜日にオンライン活動しているか
 * @property int|null $online_date_of_activity_wednesday 水曜日にオンライン活動しているか
 * @property int|null $online_date_of_activity_thursday 木曜日にオンライン活動しているか
 * @property int|null $online_date_of_activity_friday 金曜日にオンライン活動しているか
 * @property int|null $online_date_of_activity_saturday 土曜日にオンライン活動しているか
 * @property int|null $online_date_of_activity_sunday 日曜日にオンライン活動しているか
 * @property string|null $online_date_of_activity_detail オンライン活動日時詳細
 * @property int|null $admission_fee_per_year 年間費用
 * @property int|null $number_of_members 所属人数
 * @property int|null $is_club_activities 部活の有無
 * @property string|null $appealing_point1 アピールポイント1
 * @property string|null $appealing_point2 アピールポイント2
 * @property string|null $appealing_point3 アピールポイント3
 * @property string|null $public_email 公開用メールアドレス
 * @property string|null $twitter_url Twitter URL
 * @property string|null $facebook_url Facebook URL
 * @property string|null $instagram_url Instagram URL
 * @property string|null $line_url Line URL
 * @property string|null $youtube_url Youtube URL
 * @property string|null $homepage_url Homepage URL
 * @property string|null $peing_url Peing URL
 * @property string|null $github_url GitHub URL
 * @property string|null $tiktok_url Tiktok URL
 * @property string|null $participation_url 参加フォーム用のURL
 * @property string|null $main_image_url メイン画像
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Circle $circle
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation query()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereAdmissionFeePerYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereAppealingPoint1($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereAppealingPoint2($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereAppealingPoint3($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereCircleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereCircleType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereCommonDateOfActivityDetail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereCommonDateOfActivityFriday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereCommonDateOfActivityMonday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereCommonDateOfActivitySaturday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereCommonDateOfActivitySunday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereCommonDateOfActivityThursday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereCommonDateOfActivityTuesday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereCommonDateOfActivityWednesday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereCommonPlaceOfActivity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereCommonPlaceOfActivityDetail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereFacebookUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereGithubUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereHomepageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereInstagramUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereIntro($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereIsClubActivities($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereIsOnlineActivity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereLineUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereMainImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereNameKana($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereNumberOfMembers($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereOnlineDateOfActivityDetail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereOnlineDateOfActivityFriday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereOnlineDateOfActivityMonday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereOnlineDateOfActivitySaturday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereOnlineDateOfActivitySunday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereOnlineDateOfActivityThursday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereOnlineDateOfActivityTuesday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereOnlineDateOfActivityWednesday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereOnlinePlaceOfActivityDetail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereParticipationUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation wherePeingUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation wherePrefixName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation wherePublicEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereShortName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereTiktokUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereTwitterUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereYoutubeUrl($value)
 */
	class CircleInformation extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\CircleInvitation
 *
 * @property int $id
 * @property int $circle_id
 * @property string $token
 * @property bool $active
 * @property int $created_user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInvitation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInvitation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInvitation query()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInvitation whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInvitation whereCircleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInvitation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInvitation whereCreatedUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInvitation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInvitation whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInvitation whereUpdatedAt($value)
 */
	class CircleInvitation extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\CircleNewJoy
 *
 * @property int $id
 * @property int $circle_id
 * @property string $title サークル新歓タイトル
 * @property string|null $description サークル新歓紹介
 * @property string|null $url サークル新歓 URL
 * @property string|null $place_of_activity 活動場所
 * @property string|null $place_of_activity_detail 活動場所詳細
 * @property \datetime|null $publish_from 公開開始日時
 * @property \datetime|null $publish_to 公開終了日時
 * @property \datetime|null $start_date 新歓開始日時
 * @property \datetime|null $end_date 新歓終了日時
 * @property bool $release 公開設定
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read bool $now_public
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy nowPublic(\Illuminate\Support\Carbon $now)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy query()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy whereCircleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy wherePlaceOfActivity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy wherePlaceOfActivityDetail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy wherePublishFrom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy wherePublishTo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy whereRelease($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy whereUrl($value)
 */
	class CircleNewJoy extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\CircleUser
 *
 * @property int $id
 * @property int $user_id
 * @property int $circle_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Circle $circle
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|CircleUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleUser whereCircleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleUser whereUserId($value)
 */
	class CircleUser extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\User
 *
 * @property int $id
 * @property string $username
 * @property string $display_name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string|null $password
 * @property string $api_token
 * @property bool $active
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\AdminUser|null $adminUser
 * @property-read \App\Models\CircleUser|null $circleUser
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @method static \Illuminate\Database\Eloquent\Builder|User canAdminLogin()
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereAdminUser()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereApiToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereDisplayName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUsername($value)
 */
	class User extends \Eloquent implements \Illuminate\Contracts\Auth\MustVerifyEmail {}
}

