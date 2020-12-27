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
 * App\Models\Circle
 *
 * @property int $id
 * @property string $slug
 * @property int $release
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CircleInformation|null $circleInformation
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
 * @property int|null $circle_type_id
 * @property string $name サークル名
 * @property string|null $name_kana サークル名(カナ)
 * @property string|null $short_name サークル名(通称)
 * @property string|null $prefix_name サークル名(肩書)
 * @property string|null $description サークル短文紹介
 * @property string|null $intro サークル長文紹介
 * @property string|null $place_of_activity 活動場所
 * @property string|null $place_of_activity_detail 活動場所詳細
 * @property string|null $date_of_activity_monday 活動日時(月)
 * @property string|null $date_of_activity_tuesday 活動日時(火)
 * @property string|null $date_of_activity_wednesday 活動日時(水)
 * @property string|null $date_of_activity_thursday 活動日時(木)
 * @property string|null $date_of_activity_friday 活動日時(金)
 * @property string|null $date_of_activity_saturday 活動日時(土)
 * @property string|null $date_of_activity_sunday 活動日時(日)
 * @property string|null $date_of_activity_detail 活動日時詳細
 * @property string|null $admission_fee 入会費
 * @property int|null $number_of_members 所属人数
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
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Circle $circle
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation query()
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereAdmissionFee($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereCircleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereCircleTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereDateOfActivityDetail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereDateOfActivityFriday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereDateOfActivityMonday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereDateOfActivitySaturday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereDateOfActivitySunday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereDateOfActivityThursday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereDateOfActivityTuesday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereDateOfActivityWednesday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereFacebookUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereGithubUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereHomepageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereInstagramUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereIntro($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereLineUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereNameKana($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereNumberOfMembers($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation whereParticipationUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation wherePeingUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation wherePlaceOfActivity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CircleInformation wherePlaceOfActivityDetail($value)
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
 * App\Models\CircleUser
 *
 * @property int $id
 * @property int $user_id
 * @property int $circle_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
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
 * @property string $password
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

