<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUuyellPostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('uuyell_posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('wordpress_id')->unique();
            $table->string('slug')->unique()->comment('記事のSlug');
            $table->string('title')->comment('記事タイトル');
            $table->string('link', 1000)->comment('記事のリンク');
            $table->dateTime('date')->comment('記事作成日時');
            $table->unsignedBigInteger('featured_media')->comment('アイキャッチのID');
            $table->string('media_source_url', 1000)->nullable()->comment('記事のアイキャッチのURL');
            $table->string('media_alt_text', 1000)->nullable()->comment('記事のアイキャッチのタイトル');
            $table->boolean('published')->default(true)->comment('公開されているかどうか');
            $table->dateTime('notified_at')->nullable()->comment('通知日時');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('uuyell_posts');
    }
}
