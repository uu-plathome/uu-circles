<?php

namespace App\Exports\Sheets;

use App\Models\Circle;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

final class CircleInfoSheet implements FromCollection, WithHeadings, WithTitle
{
    public function collection()
    {
        return Circle::with([
            'circleInformation',
            'circleHandbill',
            'circleTag',
            'circlePageView',
        ])
            ->get()
            ->map(function (Circle $circle, int $idx) {
                return $this->circleToCollection($circle, $idx + 1);
            });
    }

    public function headings(): array
    {
        return [
            'No',
            'サークル名',
            'サークルslug',
            'URL',
            '公開中かどうか',
            'メイン画面に固定するかどうか',
            'デモ画面にのみ表示するかどうか',
            'デモのメイン画面に固定するかどうか',
            'デモのメイン画面の表示優先度',
            /** circle_type */
            'サークルタイプ',
            /** name_kana */
            'サークル名(カタカナ)',
            /** short_name */
            'サークル名(省略名)',
            /** prefix_name */
            'サークル肩書',
            /** description */
            'サークル説明',
            /** common_place_of_activity */
            '通常活動場所',
            /** common_place_of_activity_detail */
            '通常活動場所詳細',
            /** common_date_of_activity_monday */
            '通常活動(月曜日)',
            /** common_date_of_activity_tuesday */
            '通常活動(火曜日)',
            /** common_date_of_activity_wednesday */
            '通常活動(水曜日)',
            /** common_date_of_activity_thursday */
            '通常活動(木曜日)',
            /** common_date_of_activity_friday */
            '通常活動(金曜日)',
            /** common_date_of_activity_saturday */
            '通常活動(土曜日)',
            /** common_date_of_activity_sunday */
            '通常活動(日曜日)',
            /** common_date_of_activity_detail */
            '通常活動日時詳細',
            /** is_online_activity */
            'オンライン活動するかどうか',
            /** online_place_of_activity_detail */
            'オンライン活動詳細',
            /** online_date_of_activity_monday */
            'オンライン活動(月曜日)',
            /** online_date_of_activity_tuesday */
            'オンライン活動(火曜日)',
            /** online_date_of_activity_wednesday */
            'オンライン活動(水曜日)',
            /** online_date_of_activity_thursday */
            'オンライン活動(木曜日)',
            /** online_date_of_activity_friday */
            'オンライン活動(金曜日)',
            /** online_date_of_activity_saturday */
            'オンライン活動(土曜日)',
            /** online_date_of_activity_sunday */
            'オンライン活動(日曜日)',
            /** online_date_of_activity_detail */
            'オンライン活動日時詳細',
            /** weeklyActivityDays */
            '週の活動日数',
            /** admission_fee_per_year */
            '年間費用',
            /** is_club_activities */
            '部活かどうか',
            /** appealing_point1 */
            'アピールポイント1',
            /** appealing_point2 */
            'アピールポイント2',
            /** appealing_point3 */
            'アピールポイント3',
            /** number_of_members */
            '所属人数',
            /** public_email */
            '公開メールアドレス',
            /** twitter_url */
            'Twitter URL',
            /** facebook_url */
            'Facebook URL',
            /** instagram_url */
            'Instagram URL',
            /** line_url */
            'Line URL',
            /** youtube_url */
            'Youtube URL',
            /** homepage_url */
            '公式サイト',
            /** peing_url */
            'Peing URL',
            /** github_url */
            'GitHub URL',
            /** tiktok_url */
            'TikTok URL',
            /** participation_url */
            '参加フォーム用のURL',
            /** main_image_url */
            'ロゴURL',
            /** activity_image_url1 */
            '活動写真URL1',
            /** activity_image_url2 */
            '活動写真URL2',
            /** activity_image_url3 */
            '活動写真URL3',
            /** activity_image_url4 */
            '活動写真URL4',
            /** activity_image_url5 */
            '活動写真URL5',
            /** activity_image_url6 */
            '活動写真URL6',
            /** wp_url */
            'WordPress Url',
            /** wp_tag_taxonomy */
            'WordPress タグ',
            /** is_view_wp_post */
            'WordPress記事を表示するかどうか',
            /** handbill */
            '新歓ビラURL',
            /** page_views */
            'ページ閲覧数',
            /** active_users */
            'アクティブユーザー',
            /** sport */
            'タグ(スポーツ)',
            /** music */
            'タグ(音楽)',
            /** culture */
            'タグ(文化)',
            /** nature */
            'タグ(農業・自然)',
            /** volunteer */
            'タグ(ボランティア)',
            /** international */
            'タグ(国際)',
            /** incare */
            'タグ(インカレ)',
            /** loose */
            'タグ(ゆるい)',
            /** community */
            'タグ(地域おこし)',
            /** programming */
            'タグ(プログラミング)',
            /** urgent_recruitment */
            'タグ(部員急募)',
            /** mystery */
            'タグ(謎)',
            /** mammoth */
            'タグ(マンモス)',
        ];
    }

    /**
     * シート名.
     *
     * @return string
     */
    public function title(): string
    {
        return 'サークル一覧';
    }

    private function circleToCollection(Circle $circle, int $no): Collection
    {
        return new Collection([
            'No'                                => $no,
            'name'                              => $circle->name,
            'slug'                              => $circle->slug,
            'url'                               => "https://uu-circles.com/circle/$circle->slug",
            'release'                           => $this->boolOrNullToExcelFormat($circle->release),
            'is_main_fixed'                     => $this->boolOrNullToExcelFormat($circle->is_main_fixed),
            'is_only_demo'                      => $this->boolOrNullToExcelFormat($circle->is_only_demo),
            'is_demo_fixed'                     => $this->boolOrNullToExcelFormat($circle->is_demo_fixed),
            'demo_priority'                     => $circle->demo_priority ?: '0',
            'circle_type'                       => $circle->circleInformation ? __('circleType.'.$circle->circleInformation->circle_type) : null,
            'name_kana'                         => $circle->circleInformation ? $circle->circleInformation->name_kana : null,
            'short_name'                        => $circle->circleInformation ? $circle->circleInformation->short_name : null,
            'prefix_name'                       => $circle->circleInformation ? $circle->circleInformation->prefix_name : null,
            'description'                       => $circle->circleInformation ? $circle->circleInformation->description : null,
            'common_place_of_activity'          => $circle->circleInformation ? $circle->circleInformation->common_place_of_activity : null,
            'common_place_of_activity_detail'   => $circle->circleInformation ? $circle->circleInformation->common_place_of_activity_detail : null,
            'common_date_of_activity_monday'    => $circle->circleInformation ? $this->boolOrNullToExcelFormat($circle->circleInformation->common_date_of_activity_monday) : null,
            'common_date_of_activity_tuesday'   => $circle->circleInformation ? $this->boolOrNullToExcelFormat($circle->circleInformation->common_date_of_activity_tuesday) : null,
            'common_date_of_activity_wednesday' => $circle->circleInformation ? $this->boolOrNullToExcelFormat($circle->circleInformation->common_date_of_activity_wednesday) : null,
            'common_date_of_activity_thursday'  => $circle->circleInformation ? $this->boolOrNullToExcelFormat($circle->circleInformation->common_date_of_activity_thursday) : null,
            'common_date_of_activity_friday'    => $circle->circleInformation ? $this->boolOrNullToExcelFormat($circle->circleInformation->common_date_of_activity_friday) : null,
            'common_date_of_activity_saturday'  => $circle->circleInformation ? $this->boolOrNullToExcelFormat($circle->circleInformation->common_date_of_activity_saturday) : null,
            'common_date_of_activity_sunday'    => $circle->circleInformation ? $this->boolOrNullToExcelFormat($circle->circleInformation->common_date_of_activity_sunday) : null,
            'common_date_of_activity_detail'    => $circle->circleInformation ? $circle->circleInformation->common_date_of_activity_detail : null,
            'is_online_activity'                => $circle->circleInformation ? $circle->circleInformation->is_online_activity : null,
            'online_place_of_activity_detail'   => $circle->circleInformation ? $circle->circleInformation->online_place_of_activity_detail : null,
            'online_date_of_activity_monday'    => $circle->circleInformation ? $this->boolOrNullToExcelFormat($circle->circleInformation->online_date_of_activity_monday) : null,
            'online_date_of_activity_tuesday'   => $circle->circleInformation ? $this->boolOrNullToExcelFormat($circle->circleInformation->online_date_of_activity_tuesday) : null,
            'online_date_of_activity_wednesday' => $circle->circleInformation ? $this->boolOrNullToExcelFormat($circle->circleInformation->online_date_of_activity_wednesday) : null,
            'online_date_of_activity_thursday'  => $circle->circleInformation ? $this->boolOrNullToExcelFormat($circle->circleInformation->online_date_of_activity_thursday) : null,
            'online_date_of_activity_friday'    => $circle->circleInformation ? $this->boolOrNullToExcelFormat($circle->circleInformation->online_date_of_activity_friday) : null,
            'online_date_of_activity_saturday'  => $circle->circleInformation ? $this->boolOrNullToExcelFormat($circle->circleInformation->online_date_of_activity_saturday) : null,
            'online_date_of_activity_sunday'    => $circle->circleInformation ? $this->boolOrNullToExcelFormat($circle->circleInformation->online_date_of_activity_sunday) : null,
            'online_date_of_activity_detail'    => $circle->circleInformation ? $circle->circleInformation->online_date_of_activity_detail : null,
            'weeklyActivityDays'                => $circle->circleInformation ? $circle->circleInformation->weeklyActivityDays() : null,
            'admission_fee_per_year'            => $circle->circleInformation && is_int($circle->circleInformation->admission_fee_per_year) ?
                (string) $circle->circleInformation->admission_fee_per_year
                : null,
            'is_club_activities' => $circle->circleInformation ? $this->boolOrNullToExcelFormat($circle->circleInformation->is_club_activities) : null,
            'appealing_point1'   => $circle->circleInformation ? $circle->circleInformation->appealing_point1 : null,
            'appealing_point2'   => $circle->circleInformation ? $circle->circleInformation->appealing_point2 : null,
            'appealing_point3'   => $circle->circleInformation ? $circle->circleInformation->appealing_point3 : null,
            'number_of_members'  => $circle->circleInformation && is_int($circle->circleInformation->number_of_members) ?
                (string) $circle->circleInformation->number_of_members
                : null,
            'public_email'        => $circle->circleInformation ? $circle->circleInformation->public_email : null,
            'twitter_url'         => $circle->circleInformation ? $circle->circleInformation->twitter_url : null,
            'facebook_url'        => $circle->circleInformation ? $circle->circleInformation->facebook_url : null,
            'instagram_url'       => $circle->circleInformation ? $circle->circleInformation->instagram_url : null,
            'line_url'            => $circle->circleInformation ? $circle->circleInformation->line_url : null,
            'youtube_url'         => $circle->circleInformation ? $circle->circleInformation->youtube_url : null,
            'homepage_url'        => $circle->circleInformation ? $circle->circleInformation->homepage_url : null,
            'peing_url'           => $circle->circleInformation ? $circle->circleInformation->peing_url : null,
            'github_url'          => $circle->circleInformation ? $circle->circleInformation->github_url : null,
            'tiktok_url'          => $circle->circleInformation ? $circle->circleInformation->tiktok_url : null,
            'participation_url'   => $circle->circleInformation ? $circle->circleInformation->participation_url : null,
            'main_image_url'      => $circle->circleInformation ? $circle->circleInformation->main_image_url : null,
            'activity_image_url1' => $circle->circleInformation ? $circle->circleInformation->activity_image_url1 : null,
            'activity_image_url2' => $circle->circleInformation ? $circle->circleInformation->activity_image_url2 : null,
            'activity_image_url3' => $circle->circleInformation ? $circle->circleInformation->activity_image_url3 : null,
            'activity_image_url4' => $circle->circleInformation ? $circle->circleInformation->activity_image_url4 : null,
            'activity_image_url5' => $circle->circleInformation ? $circle->circleInformation->activity_image_url5 : null,
            'activity_image_url6' => $circle->circleInformation ? $circle->circleInformation->activity_image_url6 : null,
            'wp_url'              => $circle->circleInformation ? $circle->circleInformation->wp_url : null,
            'wp_tag_taxonomy'     => $circle->circleInformation ? $circle->circleInformation->wp_tag_taxonomy : null,
            'is_view_wp_post'     => $circle->circleInformation ? $this->boolOrNullToExcelFormat($circle->circleInformation->is_view_wp_post) : null,
            'handbill'            => $circle->circleHandbill ? $circle->circleHandbill->image_url : null,
            'page_views'          => $circle->circlePageView ? $circle->circlePageView->page_views ?: 0 : 0,
            'active_users'        => $circle->circlePageView ? $circle->circlePageView->active_users ?: 0 : 0,
            'sport'               => $circle->circleTag ? $this->boolOrNullToExcelFormat($circle->circleTag->sport) : null,
            'music'               => $circle->circleTag ? $this->boolOrNullToExcelFormat($circle->circleTag->music) : null,
            'culture'             => $circle->circleTag ? $this->boolOrNullToExcelFormat($circle->circleTag->culture) : null,
            'nature'              => $circle->circleTag ? $this->boolOrNullToExcelFormat($circle->circleTag->nature) : null,
            'volunteer'           => $circle->circleTag ? $this->boolOrNullToExcelFormat($circle->circleTag->volunteer) : null,
            'international'       => $circle->circleTag ? $this->boolOrNullToExcelFormat($circle->circleTag->international) : null,
            'incare'              => $circle->circleTag ? $this->boolOrNullToExcelFormat($circle->circleTag->incare) : null,
            'loose'               => $circle->circleTag ? $this->boolOrNullToExcelFormat($circle->circleTag->loose) : null,
            'community'           => $circle->circleTag ? $this->boolOrNullToExcelFormat($circle->circleTag->community) : null,
            'programming'         => $circle->circleTag ? $this->boolOrNullToExcelFormat($circle->circleTag->programming) : null,
            'urgent_recruitment'  => $circle->circleTag ? $this->boolOrNullToExcelFormat($circle->circleTag->urgent_recruitment) : null,
            'mystery'             => $circle->circleTag ? $this->boolOrNullToExcelFormat($circle->circleTag->mystery) : null,
            'mammoth'             => $circle->circleInformation ? $this->boolOrNullToExcelFormat($circle->circleInformation->mammoth) : null,
        ]);
    }

    private function boolOrNullToExcelFormat(?bool $v): string
    {
        if (!$v) {
            return 'FALSE';
        }

        return 'TRUE';
    }
}
