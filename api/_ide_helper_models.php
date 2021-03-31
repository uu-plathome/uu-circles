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
 * @property string $role 権限
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|AdminUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AdminUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AdminUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|AdminUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AdminUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AdminUser whereRole($value)
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
 * @property string|null $link 広告リンク
 * @property string|null $main_image_url 画像URL
 * @property bool $active 公開するかどうか
 * @property \datetime|null $publish_to 公開開始日時
 * @property \datetime|null $publish_from 公開終了日時
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $advertise_type 広告種類
 * @property-read bool $now_public
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise nowPublic(\Illuminate\Support\Carbon $now)
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise query()
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise whereAdvertiseType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advertise whereLink($value)
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
 * @property string $name サークル名
 * @property string $slug circle slug
 * @property bool $release 公開設定
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property bool $is_main_fixed メイン画面に固定するかどうか
 * @property-read \App\Models\CircleHandbill|null $circleHandbill
 * @property-read \App\Models\CircleInformation|null $circleInformation
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\CircleInvitation[] $circleInvitation
 * @property-read int|null $circle_invitation_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\CircleNewJoy[] $circleNewJoys
 * @property-read int|null $circle_new_joys_count
 * @property-read \App\Models\CircleTag|null $circleTag
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\CircleUser[] $circleUsers
 * @property-read int|null $circle_users_count
 * @method static \Illuminate\Database\Eloquent\Builder|Circle newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Circle newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Circle query()
 * @method static \Illuminate\Database\Eloquent\Builder|Circle whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Circle whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Circle whereIsMainFixed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Circle whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Circle whereRelease($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Circle whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Circle whereUpdatedAt($value)
 */
	class Circle extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\CircleHandbill
 *
 * @property int $id
 * @property int $circle_id
 * @property string $image_url 画像URL
 * @property int|null $year 作成年度
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|CircleHandbill newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleHandbill newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleHandbill query()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleHandbill whereCircleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleHandbill whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleHandbill whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleHandbill whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleHandbill whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleHandbill whereYear($value)
 */
	class CircleHandbill extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\CircleInformation
 *
 * @property int $id
 * @property int $circle_id
 * @property string|null $circle_type 'OFFICIAL_ORGANIZATION': 公認団体, 'UNOFFICIAL_ORGANIZATION': 非公認団体, 'SENDING_ORGANIZATION': 届出団体, 'STUDENT_GROUP': 学生団体
 * @property string|null $name_kana サークル名(カナ)
 * @property string|null $short_name サークル名(通称)
 * @property string|null $prefix_name サークル名(肩書)
 * @property string|null $description サークル紹介文
 * @property string|null $common_place_of_activity 通常活動場所
 * @property string|null $common_place_of_activity_detail 通常活動場所詳細
 * @property bool $common_date_of_activity_monday 月曜日に通常活動しているか
 * @property bool $common_date_of_activity_tuesday 火曜日に通常活動しているか
 * @property bool $common_date_of_activity_wednesday 水曜日に通常活動しているか
 * @property bool $common_date_of_activity_thursday 木曜日に通常活動しているか
 * @property bool $common_date_of_activity_friday 金曜日に通常活動しているか
 * @property bool $common_date_of_activity_saturday 土曜日に通常活動しているか
 * @property bool $common_date_of_activity_sunday 日曜日に通常活動しているか
 * @property string|null $common_date_of_activity_detail 活動日時詳細
 * @property bool $is_online_activity オンライン活動するか
 * @property string|null $online_place_of_activity_detail オンライン活動場所詳細
 * @property bool $online_date_of_activity_monday 月曜日にオンライン活動しているか
 * @property bool $online_date_of_activity_tuesday 火曜日にオンライン活動しているか
 * @property bool $online_date_of_activity_wednesday 水曜日にオンライン活動しているか
 * @property bool $online_date_of_activity_thursday 木曜日にオンライン活動しているか
 * @property bool $online_date_of_activity_friday 金曜日にオンライン活動しているか
 * @property bool $online_date_of_activity_saturday 土曜日にオンライン活動しているか
 * @property bool $online_date_of_activity_sunday 日曜日にオンライン活動しているか
 * @property string|null $online_date_of_activity_detail オンライン活動日時詳細
 * @property int|null $admission_fee_per_year 年間費用
 * @property int|null $number_of_members 所属人数
 * @property bool|null $is_club_activities 部活かどうか
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
 * @property string|null $activity_image_url1 活動画像1
 * @property string|null $activity_image_url2 活動画像2
 * @property string|null $activity_image_url3 活動画像3
 * @property string|null $activity_image_url4 活動画像4
 * @property string|null $activity_image_url5 活動画像5
 * @property string|null $activity_image_url6 活動画像6
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Circle $circle
 * @property-read bool $active_activity
 * @property-read bool $mammoth
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation query()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereActiveActivity()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereActivityImageUrl1($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereActivityImageUrl2($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereActivityImageUrl3($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereActivityImageUrl4($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereActivityImageUrl5($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereActivityImageUrl6($value)
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
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereIsClubActivities($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereIsOnlineActivity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereLineUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereMainImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereMammoth()
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
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereOnlyFriday()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereOnlyMonday()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereOnlyThursday()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereOnlyTuesday()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereOnlyWednesday()
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
 * @property string $title 新歓名
 * @property string|null $description 新歓紹介
 * @property string|null $url 新歓URL
 * @property string|null $place_of_activity 活動場所
 * @property string|null $place_of_activity_detail 活動場所詳細
 * @property \datetime|null $publish_from 予約投稿日時
 * @property \datetime|null $start_date 新歓開始日時
 * @property \datetime|null $end_date 新歓終了日時
 * @property bool $release 公開設定
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $private_newjoy_link 非公開リンク
 * @property-read \App\Models\Circle $circle
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
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy wherePrivateNewjoyLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleNewJoy wherePublishFrom($value)
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
 * App\Models\CircleTag
 *
 * @property int $id
 * @property int $circle_id
 * @property bool $sport 運動系
 * @property bool $music 音楽系
 * @property bool $culture 文化系
 * @property bool $nature 農業・自然
 * @property bool $volunteer ボランティア
 * @property bool $international 国際交流
 * @property bool $incare インカレ
 * @property bool $loose ゆるい
 * @property bool $community 地域おこし
 * @property bool $programming プログラミング
 * @property bool $urgent_recruitment 部員急募
 * @property bool $mystery 謎
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|CircleTag newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleTag newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleTag query()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleTag whereCircleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleTag whereCommunity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleTag whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleTag whereCulture($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleTag whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleTag whereIncare($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleTag whereInternational($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleTag whereLoose($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleTag whereMusic($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleTag whereMystery($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleTag whereNature($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleTag whereProgramming($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleTag whereSport($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleTag whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleTag whereUrgentRecruitment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleTag whereVolunteer($value)
 */
	class CircleTag extends \Eloquent {}
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
 * @property string $role 権限
 * @property-read \App\Models\Circle $circle
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|CircleUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleUser whereCircleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleUser whereRole($value)
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
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\CircleUser[] $circleUsers
 * @property-read int|null $circle_users_count
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

