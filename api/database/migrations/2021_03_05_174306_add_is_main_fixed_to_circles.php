<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIsMainFixedToCircles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('circles', function (Blueprint $table) {
            $table->boolean('is_main_fixed')->default(false)->comment('メイン画面に固定するかどうか');

            $table->index([
                'release',
                'is_main_fixed'
            ]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('circles', function (Blueprint $table) {
            $table->dropColumn('is_main_fixed');

            $table->dropIndex([
                'release',
                'is_main_fixed'
            ]);
        });
    }
}
