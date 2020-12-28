<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
            $table->unsignedBigInteger('circle_type_id')->nullable();
            $table->string('name')->comment('サークル名');
            $table->string('name_kana')->nullable()->comment('サークル名(カナ)');
            $table->string('short_name')->nullable()->comment('サークル名(通称)');
            $table->string('prefix_name')->nullable()->comment('サークル名(肩書)');
            $table->string('description')->nullable()->comment('サークル短文紹介');
            $table->longText('intro')->nullable()->comment('サークル長文紹介');
            $table->string('place_of_activity')->nullable()->comment('活動場所');
            $table->string('place_of_activity_detail')->nullable()->comment('活動場所詳細');
            $table->boolean('do_online_activity')->default(false)->comment('オンライン活動するか');
            $table->string('date_of_activity_monday')->nullable()->comment('活動日時(月)');
            $table->string('date_of_activity_tuesday')->nullable()->comment('活動日時(火)');
            $table->string('date_of_activity_wednesday')->nullable()->comment('活動日時(水)');
            $table->string('date_of_activity_thursday')->nullable()->comment('活動日時(木)');
            $table->string('date_of_activity_friday')->nullable()->comment('活動日時(金)');
            $table->string('date_of_activity_saturday')->nullable()->comment('活動日時(土)');
            $table->string('date_of_activity_sunday')->nullable()->comment('活動日時(日)');
            $table->string('date_of_activity_detail')->nullable()->comment('活動日時詳細');
            $table->string('admission_fee')->nullable()->comment('入会費');
            $table->unsignedInteger('number_of_members')->nullable()->comment('所属人数');
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
            $table->timestamps();

            $table->foreign('circle_id')->references('id')->on('circles');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shop_information');
    }
}
