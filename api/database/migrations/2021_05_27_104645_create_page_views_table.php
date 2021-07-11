<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePageViewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('page_views', function (Blueprint $table) {
            $table->id();
            $table->string('url', 1000)->comment('url');
            $table->unsignedBigInteger('page_views')->comment('ページ数');
            $table->unsignedBigInteger('active_users')->comment('ユーザー数');
            $table->timestamps();
        });

        DB::statement("ALTER TABLE page_views COMMENT 'Page View'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('page_views');
    }
}
