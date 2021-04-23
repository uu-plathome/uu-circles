<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTweetIdToUuyellPosts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('uuyell_posts', function (Blueprint $table) {
            $table->boolean('can_repost')->after('published')->default(false)->nullable()->comment('もう一度投稿してもいいか');
            $table->unsignedBigInteger('tweet_id')->after('can_repost')->nullable()->comment('Tweet Id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('uuyell_posts', function (Blueprint $table) {
            $table->dropColumn(['tweet_id']);
        });
    }
}
