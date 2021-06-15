<?php

namespace Database\Seeders;

use App\Models\UuyellPost;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class UuyellPostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @throws Exception
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now();

        DB::beginTransaction();

        try {

            // bulk insertにするとエラーが読みにくいから、loopしてインサートする
            foreach (
                (new Collection($this->insertData()))->map(
                    fn (array $arr) => array_merge(
                        $arr,
                        [
                            'can_repost' => 1,
                            'created_at' => $now,
                            'updated_at' => $now,
                        ]
                    )
                )->toArray()
                as
                $arr) {
                UuyellPost::insert(
                    $arr
                );

                DB::statement('UPDATE uuyell_posts SET tweet_id=1384311064074981376, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 816;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1384037104234106887, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 806;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1383971012824338433, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 769;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1382623763460624387, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 755;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1382890829799329792, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 741;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1386133528652378113, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 691;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1378852433439256577, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 619;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1379334150340026368, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 614;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1377951614263205890, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 593;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1377508593151340545, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 560;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1383723591594700810, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 537;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1383283626431848448, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 466;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1382131905265426432, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 474;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1382131781474742274, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 467;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1377056579468464134, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 170;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1377056182519488522, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 73;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1371990711411691520, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 415;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1373062706970861568, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 398;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1371992487011643393, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 344;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1371992084912119811, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 269;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1380440536381804544, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 123;');
                DB::statement('UPDATE uuyell_posts SET tweet_id=1370546791750410240, notified_at=NOW(), updated_at=NOW() WHERE wordpress_id = 49;');

                DB::commit();
            }
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }
    }

    protected function insertData(): array
    {
        return [
            [
                'wordpress_id'     => 853,
                'slug'             => 'ashio',
                'title'            => ' File#7　足尾の森づくりイベント',
                'link'             => 'https://media.uu-circles.com/2021/04/ashio/',
                'date'             => '2021-04-26 15:00:34',
                'featured_media'   => 525,
                'media_source_url' => null,
            ],
            [
                'wordpress_id'     => 834,
                'slug'             => 'u-san4',
                'title'            => '[ウーさん④]伝えたいこと',
                'link'             => 'https://media.uu-circles.com/2021/04/u-san4/',
                'date'             => '2021-04-21 10:03:43',
                'featured_media'   => 440,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/my趣味2_アートボード-1.jpg',
            ],
            [
                'wordpress_id'     => 826,
                'slug'             => 'health-2',
                'title'            => '寝る前の3秒でできる！1コマ目に遅刻しない方法',
                'link'             => 'https://media.uu-circles.com/2021/04/health-2/',
                'date'             => '2021-04-20 11:32:02',
                'featured_media'   => 753,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/04/一人暮らしの健康学入門.jpg',
            ],
            [
                'wordpress_id'     => 816,
                'slug'             => 'ohya-museum',
                'title'            => '【大谷#6】大谷資料館からのメッセージ',
                'link'             => 'https://media.uu-circles.com/2021/04/ohya-museum/',
                'date'             => '2021-04-20 08:20:00',
                'featured_media'   => 814,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/04/大谷資料館からのメッセージ.jpg',
            ],
            [
                'wordpress_id'     => 806,
                'slug'             => 'questionnaire',
                'title'            => 'アンケートのお願い4/25迄',
                'link'             => 'https://media.uu-circles.com/2021/04/questionnaire/',
                'date'             => '2021-04-19 15:45:40',
                'featured_media'   => 52,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/02/サムネ2.png',
            ],
            [
                'wordpress_id'     => 769,
                'slug'             => 'live-first-step',
                'title'            => '号外！ライブのお知らせ！',
                'link'             => 'https://media.uu-circles.com/2021/04/live-first-step/',
                'date'             => '2021-04-16 08:23:00',
                'featured_media'   => 872,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/04/さいしょvol3-フライヤー改.jpg',
            ],
            [
                'wordpress_id'     => 755,
                'slug'             => 'online-class',
                'title'            => '宇大オンライン授業の基礎知識',
                'link'             => 'https://media.uu-circles.com/2021/04/online-class/',
                'date'             => '2021-04-15 17:36:59',
                'featured_media'   => 798,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/04/オンライン授業の基礎知識.jpg',
            ],
            [
                'wordpress_id'     => 747,
                'slug'             => 'u-san3',
                'title'            => '[ウーさん③]さいしょのいっぽ',
                'link'             => 'https://media.uu-circles.com/2021/04/u-san3/',
                'date'             => '2021-04-14 08:35:00',
                'featured_media'   => 440,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/my趣味2_アートボード-1.jpg',
            ],
            [
                'wordpress_id'     => 741,
                'slug'             => 'health-1',
                'title'            => 'コンビニで買える！太りづらく、食費も浮く手軽なおやつ4選',
                'link'             => 'https://media.uu-circles.com/2021/04/health-1/',
                'date'             => '2021-04-13 17:00:48',
                'featured_media'   => 753,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/04/一人暮らしの健康学入門.jpg',
            ],
            [
                'wordpress_id'     => 733,
                'slug'             => 'health-0',
                'title'            => '些細な行動、大きな影響',
                'link'             => 'https://media.uu-circles.com/2021/04/health-0/',
                'date'             => '2021-04-12 14:24:49',
                'featured_media'   => 753,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/04/一人暮らしの健康学入門.jpg',
            ],
            [
                'wordpress_id'     => 705,
                'slug'             => 'ohya-base',
                'title'            => '【大谷#5】レポ　OHYA BASE',
                'link'             => 'https://media.uu-circles.com/2021/04/ohya-base/',
                'date'             => '2021-04-08 11:18:26',
                'featured_media'   => 679,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/04/大谷OHYABASE_アートボード-1.jpg',
            ],
            [
                'wordpress_id'     => 691,
                'slug'             => 'punto',
                'title'            => '【大谷#4】レポ　Punto -大谷町食堂-',
                'link'             => 'https://media.uu-circles.com/2021/04/punto/',
                'date'             => '2021-04-08 10:53:30',
                'featured_media'   => 680,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/04/大谷punto_アートボード-1.jpg',
            ],
            [
                'wordpress_id'     => 667,
                'slug'             => 'engineermix2',
                'title'            => 'プログラミングをシェアハウスで！EngineerMix〜住人ver.〜',
                'link'             => 'https://media.uu-circles.com/2021/04/engineermix2/',
                'date'             => '2021-04-06 15:57:26',
                'featured_media'   => 661,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/04/シェアハウスの住人_4.jpg',
            ],
            [
                'wordpress_id'     => 653,
                'slug'             => 'engineermix1',
                'title'            => 'プログラミングをシェアハウスで！EngineerMix〜創設者ver.〜',
                'link'             => 'https://media.uu-circles.com/2021/04/engineermix1/',
                'date'             => '2021-04-06 12:43:03',
                'featured_media'   => 320,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/シェアハウスの住人_3.jpg',
            ],
            [
                'wordpress_id'     => 619,
                'slug'             => 'foodbank',
                'title'            => 'フードバンクうつのみやより食品配布4/10のお知らせ※終了しました',
                'link'             => 'https://media.uu-circles.com/2021/04/foodbank/',
                'date'             => '2021-04-05 08:29:18',
                'featured_media'   => 620,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/04/S__379117577-e1617617961113.jpg',
            ],
            [
                'wordpress_id'     => 614,
                'slug'             => 'synchismo',
                'title'            => '【大谷#3】クリエイティブ・リサーチ学生集団synchismoとは',
                'link'             => 'https://media.uu-circles.com/2021/04/synchismo/',
                'date'             => '2021-04-05 08:06:18',
                'featured_media'   => 666,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/04/synchismo.jpg',
            ],
            [
                'wordpress_id'     => 593,
                'slug'             => 'sharehouse2',
                'title'            => 'こんな時こそ！シェアハウス生活のススメ',
                'link'             => 'https://media.uu-circles.com/2021/04/sharehouse2/',
                'date'             => '2021-04-02 09:00:00',
                'featured_media'   => 323,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/シェアハウスの住人_2.jpg',
            ],
            [
                'wordpress_id'     => 587,
                'slug'             => 'u-san2',
                'title'            => '[ウーさん②]名前のおはなし',
                'link'             => 'https://media.uu-circles.com/2021/03/u-san2/',
                'date'             => '2021-03-31 09:48:25',
                'featured_media'   => 440,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/my趣味2_アートボード-1.jpg',
            ],
            [
                'wordpress_id'     => 560,
                'slug'             => 'goods',
                'title'            => '買ってよかった！新生活大勝利グッズ ！',
                'link'             => 'https://media.uu-circles.com/2021/03/goods/',
                'date'             => '2021-03-31 09:00:00',
                'featured_media'   => 583,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/買ってよかったもの_アートボード-1.jpg',
            ],
            [
                'wordpress_id'     => 537,
                'slug'             => 'file-6-uuad',
                'title'            => 'File #6　建築デザイン学生団体UUAD',
                'link'             => 'https://media.uu-circles.com/2021/03/file-6-uuad/',
                'date'             => '2021-03-30 14:46:45',
                'featured_media'   => 526,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/学生活動File_uuad_CRD_アートボード-1.jpg',
            ],
            [
                'wordpress_id'     => 528,
                'slug'             => 'happy-kebab',
                'title'            => '宇大近くのお手軽がっつりランチ！HAPPY KEBAB',
                'link'             => 'https://media.uu-circles.com/2021/03/happy-kebab/',
                'date'             => '2021-03-30 14:36:05',
                'featured_media'   => 648,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/図５.jpeg',
            ],
            [
                'wordpress_id'     => 500,
                'slug'             => 'yushokukitchen',
                'title'            => '人も食事も優しい　優食キッチン',
                'link'             => 'https://media.uu-circles.com/2021/03/yushokukitchen/',
                'date'             => '2021-03-26 08:00:00',
                'featured_media'   => 503,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/image-4.png',
            ],
            [
                'wordpress_id'     => 466,
                'slug'             => 'file-5-can-connect-agri',
                'title'            => 'File #5　農産物直売所「つながり」',
                'link'             => 'https://media.uu-circles.com/2021/03/file-5-can-connect-agri/',
                'date'             => '2021-03-25 14:49:00',
                'featured_media'   => 516,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/学生活動File_nogyo_CRD_アートボード-1.jpg',
            ],
            [
                'wordpress_id'     => 474,
                'slug'             => 'file-4-miya-ulab2',
                'title'            => 'File #4　笹原尚人（みやメシ応援隊）×飯泉一馬（U-lab）後編',
                'link'             => 'https://media.uu-circles.com/2021/03/file-4-miya-ulab2/',
                'date'             => '2021-03-25 13:08:21',
                'featured_media'   => 491,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/学生活動File_miyameshi_CRD.jpg',
            ],
            [
                'wordpress_id'     => 467,
                'slug'             => 'file-4-miya-ulab1',
                'title'            => 'File #4　笹原尚人（みやメシ応援隊）×飯泉一馬（U-lab）前編',
                'link'             => 'https://media.uu-circles.com/2021/03/file-4-miya-ulab1/',
                'date'             => '2021-03-25 13:08:02',
                'featured_media'   => 491,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/学生活動File_miyameshi_CRD.jpg',
            ],
            [
                'wordpress_id'     => 170,
                'slug'             => 'file-3-promotion',
                'title'            => 'File #3　若者の投票率向上プロジェクト',
                'link'             => 'https://media.uu-circles.com/2021/03/file-3-promotion/',
                'date'             => '2021-03-25 10:12:51',
                'featured_media'   => 492,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/学生活動File_senkyo_CRD.jpg',
            ],
            [
                'wordpress_id'     => 73,
                'slug'             => 'file-2-politics',
                'title'            => 'File #2　大学生が政治について話してみた　',
                'link'             => 'https://media.uu-circles.com/2021/03/file-2-politics/',
                'date'             => '2021-03-24 23:32:00',
                'featured_media'   => 488,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/学生活動File_youtube_CRD_アートボード-1.jpg',
            ],
            [
                'wordpress_id'     => 409,
                'slug'             => 'island-stone-coffee-roastersperson-ver',
                'title'            => '【大谷#2】ISLAND STONE COFFEE ROASTERS〜person ver.〜',
                'link'             => 'https://media.uu-circles.com/2021/03/island-stone-coffee-roastersperson-ver/',
                'date'             => '2021-03-22 08:54:27',
                'featured_media'   => 443,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/大谷ISLANDSTONECOFFEEROASTERS_アートボード-1-1.jpg',
            ],
            [
                'wordpress_id'     => 415,
                'slug'             => 'enmusubi2',
                'title'            => '学生活動のENMUSUBIイベント参加者募集中!※終了しました',
                'link'             => 'https://media.uu-circles.com/2021/03/enmusubi2/',
                'date'             => '2021-03-17 09:50:52',
                'featured_media'   => 0,
                'media_source_url' => null,
            ], [
                'wordpress_id'     => 358,
                'slug'             => 'parkchitose',
                'title'            => 'おさんぽ日和〜ちとせ児童公園〜',
                'link'             => 'https://media.uu-circles.com/2021/03/parkchitose/',
                'date'             => '2021-03-12 12:43:34',
                'featured_media'   => 829,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/S__38871188.jpg',
            ],
            [
                'wordpress_id'     => 344,
                'slug'             => 'haruka2',
                'title'            => '新入生向け冊子『春香』を現役生が読んだら❷',
                'link'             => 'https://media.uu-circles.com/2021/03/haruka2/',
                'date'             => '2021-03-12 00:49:24',
                'featured_media'   => 322,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/春香を読んだら_アートボード-1.jpg',
            ],
            [
                'wordpress_id'     => 334,
                'slug'             => 'file-1-foodbank',
                'title'            => 'File＃1　フードバンクうつのみや学生メンバー',
                'link'             => 'https://media.uu-circles.com/2021/03/file-1-foodbank/',
                'date'             => '2021-03-11 21:33:58',
                'featured_media'   => 390,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/学生活動File_１_CRD.jpg',
            ],
            [
                'wordpress_id'     => 269,
                'slug'             => 'haruka1',
                'title'            => '新入生向け冊子『春香』を現役生が読んだら❶',
                'link'             => 'https://media.uu-circles.com/2021/03/haruka1/',
                'date'             => '2021-03-09 13:16:38',
                'featured_media'   => 322,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/春香を読んだら_アートボード-1.jpg',
            ],
            [
                'wordpress_id'     => 256,
                'slug'             => 'sharehouse1',
                'title'            => 'そんなあなたにシェアハウス',
                'link'             => 'https://media.uu-circles.com/2021/03/sharehouse1/',
                'date'             => '2021-03-08 11:39:12',
                'featured_media'   => 259,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/シェアハウスの住人_アートボード-1.jpg',
            ],
            [
                'wordpress_id'     => 123,
                'slug'             => 'circle-select',
                'title'            => '先輩たちのサークル選び',
                'link'             => 'https://media.uu-circles.com/2021/03/circle-select/',
                'date'             => '2021-03-08 09:43:00',
                'featured_media'   => 381,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/先輩たちのサークル選び.jpg',
            ],
            [
                'wordpress_id'     => 158,
                'slug'             => 'dining%e3%80%80sacchi',
                'title'            => '宇大生必修からあげDining Sacchi',
                'link'             => 'https://media.uu-circles.com/2021/03/dining%e3%80%80sacchi/',
                'date'             => '2021-03-08 08:00:00',
                'featured_media'   => 162,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/image-1-1.jpg',
            ],
            [
                'wordpress_id'     => 144,
                'slug'             => '%e9%99%bd%e6%9d%b1%e3%81%ae%e3%81%a1%e3%82%87%e3%81%a3%e3%81%a8%e6%b0%97%e3%81%ab%e3%81%aa%e3%82%8b%e3%81%82%e3%81%ae%e5%ba%97%e3%80%81%e3%82%a8%e3%83%90%e3%83%bc%e3%82%b0%e3%83%aa%e3%83%bc%e3%83%b3',
                'title'            => '陽東のちょっと気になるあのお店エバーグリーン・ナマステ',
                'link'             => 'https://media.uu-circles.com/2021/03/%e9%99%bd%e6%9d%b1%e3%81%ae%e3%81%a1%e3%82%87%e3%81%a3%e3%81%a8%e6%b0%97%e3%81%ab%e3%81%aa%e3%82%8b%e3%81%82%e3%81%ae%e5%ba%97%e3%80%81%e3%82%a8%e3%83%90%e3%83%bc%e3%82%b0%e3%83%aa%e3%83%bc%e3%83%b3/',
                'date'             => '2021-03-08 08:00:00',
                'featured_media'   => 215,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/na3.jpg',
            ],
            [
                'wordpress_id'     => 143,
                'slug'             => '%e3%80%8cuu-circles%e3%80%8d%e5%85%ac%e9%96%8b%ef%bc%81%ef%bc%81',
                'title'            => '「UU-Circles」公開！！',
                'link'             => 'https://media.uu-circles.com/2021/03/%e3%80%8cuu-circles%e3%80%8d%e5%85%ac%e9%96%8b%ef%bc%81%ef%bc%81/',
                'date'             => '2021-03-08 08:00:00',
                'featured_media'   => 156,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/uucircles_ogp-.jpg',
            ],
            [
                'wordpress_id'     => 103,
                'slug'             => 'ccs-iv',
                'title'            => '宇大生認知度No.1！？C.C.S.とは！',
                'link'             => 'https://media.uu-circles.com/2021/03/ccs-iv/',
                'date'             => '2021-03-08 08:00:00',
                'featured_media'   => 207,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/ccs5.jpg',
            ],
            [
                'wordpress_id'     => 49,
                'slug'             => 'hellouuyell',
                'title'            => 'ごあいさつ',
                'link'             => 'https://media.uu-circles.com/2021/03/hellouuyell/',
                'date'             => '2021-03-08 08:00:00',
                'featured_media'   => 119,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/02/uuyell-top-bg@2x.jpg',
            ],
            [
                'wordpress_id'     => 134,
                'slug'             => 'u-san1',
                'title'            => '[ウーさん①]おはようーさん ！',
                'link'             => 'https://media.uu-circles.com/2021/03/u-san1/',
                'date'             => '2021-03-07 16:48:31',
                'featured_media'   => 440,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/03/my趣味2_アートボード-1.jpg',
            ],
            [
                'wordpress_id'     => 864,
                'slug'             => 'health-3',
                'title'            => '入浴と歯磨きはいつやるのがベスト！？　～睡眠を妨げないベストな時間帯とは～',
                'link'             => 'https://media.uu-circles.com/2021/04/health-3/',
                'date'             => '2021-04-27 08:33:00',
                'featured_media'   => 753,
                'media_source_url' => 'https://media.uu-circles.com/wp-content/uploads/2021/04/一人暮らしの健康学入門.jpg',
            ],
        ];
    }
}
