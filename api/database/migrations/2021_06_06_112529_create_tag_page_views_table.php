<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTagPageViewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tag_page_views', function (Blueprint $table) {
            $table->id();
            $table->string('tag_name')->unique()->comment('タグ名');
            $table->unsignedBigInteger('page_views')->comment('ページ閲覧数');
            $table->unsignedBigInteger('active_users')->comment('ユーザー数');
            $table->timestamps();
        });

        DB::statement("ALTER TABLE tag_page_views COMMENT 'タグのアクセス数'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tag_page_views');
    }
}
