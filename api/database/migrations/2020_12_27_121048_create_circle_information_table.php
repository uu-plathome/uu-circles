<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateCircleInformationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('circle_information', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('circle_id');
            $table->enum('circle_type', ['OFFICIAL_ORGANIZATION', 'UNOFFICIAL_ORGANIZATION', 'SENDING_ORGANIZATION', 'STUDENT_GROUP'])->nullable()->comment("'OFFICIAL_ORGANIZATION': 公認団体, 'UNOFFICIAL_ORGANIZATION': 非公認団体, 'SENDING_ORGANIZATION': 届出団体, 'STUDENT_GROUP': 学生団体");
            $table->string('name_kana')->nullable()->comment('サークル名(カナ)');
            $table->string('short_name')->nullable()->comment('サークル名(通称)');
            $table->string('prefix_name')->nullable()->comment('サークル名(肩書)');
            $table->string('description')->nullable()->comment('サークル紹介文');
            $table->enum('common_place_of_activity', ['MINE', 'YOTO', 'MINE_AND_YOTO', 'DISCORD', 'OTHER'])->nullable()->comment('通常活動場所');
            $table->string('common_place_of_activity_detail')->nullable()->comment('通常活動場所詳細');
            $table->boolean('common_date_of_activity_monday')->default(false)->comment('月曜日に通常活動しているか');
            $table->boolean('common_date_of_activity_tuesday')->default(false)->comment('火曜日に通常活動しているか');
            $table->boolean('common_date_of_activity_wednesday')->default(false)->comment('水曜日に通常活動しているか');
            $table->boolean('common_date_of_activity_thursday')->default(false)->comment('木曜日に通常活動しているか');
            $table->boolean('common_date_of_activity_friday')->default(false)->comment('金曜日に通常活動しているか');
            $table->boolean('common_date_of_activity_saturday')->default(false)->comment('土曜日に通常活動しているか');
            $table->boolean('common_date_of_activity_sunday')->default(false)->comment('日曜日に通常活動しているか');
            $table->string('common_date_of_activity_detail')->nullable()->comment('活動日時詳細');
            $table->boolean('is_online_activity')->default(false)->comment('オンライン活動するか');
            $table->string('online_place_of_activity_detail')->nullable()->comment('オンライン活動場所詳細');
            $table->boolean('online_date_of_activity_monday')->default(false)->comment('月曜日にオンライン活動しているか');
            $table->boolean('online_date_of_activity_tuesday')->default(false)->comment('火曜日にオンライン活動しているか');
            $table->boolean('online_date_of_activity_wednesday')->default(false)->comment('水曜日にオンライン活動しているか');
            $table->boolean('online_date_of_activity_thursday')->default(false)->comment('木曜日にオンライン活動しているか');
            $table->boolean('online_date_of_activity_friday')->default(false)->comment('金曜日にオンライン活動しているか');
            $table->boolean('online_date_of_activity_saturday')->default(false)->comment('土曜日にオンライン活動しているか');
            $table->boolean('online_date_of_activity_sunday')->default(false)->comment('日曜日にオンライン活動しているか');
            $table->string('online_date_of_activity_detail')->nullable()->comment('オンライン活動日時詳細');
            $table->unsignedInteger('admission_fee_per_year')->nullable()->comment('年間費用');
            $table->unsignedSmallInteger('number_of_members')->nullable()->comment('所属人数');
            $table->boolean('is_club_activities')->default(false)->nullable()->comment('部活かどうか');
            $table->string('appealing_point1')->nullable()->comment('アピールポイント1');
            $table->string('appealing_point2')->nullable()->comment('アピールポイント2');
            $table->string('appealing_point3')->nullable()->comment('アピールポイント3');
            $table->string('public_email')->nullable()->comment('公開用メールアドレス');
            $table->string('twitter_url')->nullable()->comment('Twitter URL');
            $table->string('facebook_url')->nullable()->comment('Facebook URL');
            $table->string('instagram_url')->nullable()->comment('Instagram URL');
            $table->string('line_url')->nullable()->comment('Line URL');
            $table->string('youtube_url')->nullable()->comment('Youtube URL');
            $table->string('homepage_url')->nullable()->comment('Homepage URL');
            $table->string('peing_url')->nullable()->comment('Peing URL');
            $table->string('github_url')->nullable()->comment('GitHub URL');
            $table->string('tiktok_url')->nullable()->comment('Tiktok URL');
            $table->string('participation_url')->nullable()->comment('参加フォーム用のURL');
            $table->string('main_image_url')->nullable()->comment('メイン画像');
            $table->string('activity_image_url1')->nullable()->comment('活動画像1');
            $table->string('activity_image_url2')->nullable()->comment('活動画像2');
            $table->string('activity_image_url3')->nullable()->comment('活動画像3');
            $table->string('activity_image_url4')->nullable()->comment('活動画像4');
            $table->string('activity_image_url5')->nullable()->comment('活動画像5');
            $table->string('activity_image_url6')->nullable()->comment('活動画像6');
            $table->timestamps();

            $table->foreign('circle_id')->references('id')->on('circles');
        });

        DB::statement("ALTER TABLE circle_information COMMENT 'サークル情報'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('circle_information');
    }
}
