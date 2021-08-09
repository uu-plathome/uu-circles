<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnToPagePositionHistories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('page_position_histories', function (Blueprint $table) {
            $table->unsignedInteger('screen_width')
                ->nullable()
                ->comment('画面の横幅')
                ->after('page_position_id');
            $table->unsignedInteger('screen_height')
                ->nullable()
                ->comment('画面の縦幅')
                ->after('screen_width');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('page_position_histories', function (Blueprint $table) {
            $table->dropColumn([
                'screen_width',
                'screen_height',
            ]);
        });
    }
}
