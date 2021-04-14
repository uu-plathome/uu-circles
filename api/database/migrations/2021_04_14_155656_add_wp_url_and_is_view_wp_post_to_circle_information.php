<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddWpUrlAndIsViewWpPostToCircleInformation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('circle_information', function (Blueprint $table) {
            $table->string('wp_url')->nullable()->after('activity_image_url6')->comment('WordPress URL');
            $table->boolean('is_view_wp_post')->default(false)->after('wp_url')->comment('WordPressの記事を表示するかどうか');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('circle_information', function (Blueprint $table) {
            $table->dropColumn([
                'wp_url',
                'is_view_wp_post',
            ]);
        });
    }
}
